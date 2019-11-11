const shortid = require("shortid");
const jwt = require("jsonwebtoken");

module.exports = (io, db) => {
  io.on("connection", socket => {
    socket.on("chatMessage", m => {
      io.emit("chatMessage", {
        time: Date.now(),
        message: `<b>&#${"<".charCodeAt(0)};${m.username}&#${">".charCodeAt(
          0
        )};</b> ${m.message}`
      });
    });

    socket.on("getUsers", () => {
      const users = db.get("user").value();
      io.emit("allUsers", users);
    });

    socket.on("registerUser", m => {
      const users = db
        .get("user")
        .find({ name: m })
        .value();
      if (users) {
        socket.emit("registerError", `${m} existiert bereits in der Datenbank`);
        return;
      } else {
        const newId = shortid.generate();
        const newUser = db
          .get("user")
          .push({ id: newId, name: m, payed: false, isAdmin: false })
          .write().id;
        const token = jwt.sign({ id: newId }, "wlan2019");
        socket.emit("registerSuccessful", { token, name: m });
      }
    });

    socket.on("checkForTokenLogin", m => {
      try {
        const data = jwt.verify(m, "wlan2019");
        const user = db
          .get("user")
          .find({ id: data.id })
          .value();
        if (user) {
          socket.emit("registerSuccessful", {
            token: m,
            name: user.name
          });
        } else {
          socket.emit(
            "registerError",
            `Ungültiger Login-Versuch. Abgebrochen.`
          );
        }
      } catch (err) {
        socket.emit("registerError", `Ungültiger Login-Versuch. Abgebrochen.`);
      }
    });
  });
};
