const shortid = require("shortid");
const jwt = require("jsonwebtoken");

module.exports = (io, db) => {
  io.on("connection", socket => {
    socket.on("chatMessage", m => {
      const time = Date.now();
      const message = `<b>&#${"<".charCodeAt(0)};${
        m.username
      }&#${">".charCodeAt(0)};</b> ${m.message}`;

      db
        .get("chat")
        .push({ time, message })
        .write().id;

      io.emit("chatMessage", {
        time,
        message
      });
    });

    socket.on("getUsers", () => {
      const users = db.get("user").value();
      io.emit("allUsers", users);
    });

    socket.on("getChats", () => {
      const MAX = 50;
      let cut = false;
      let chat = db.get("chat").value();
      if (chat.length > MAX) cut = true;
      chat = chat.slice(Math.max(chat.length - MAX, 1));
      if (cut)
        chat.unshift({
          time: chat[0].time - 1,
          message: `<small><b><i>[Mehr als de ${MAX} Letztn warn net ahgezeigt...]</i></b></small>`
        });
      io.emit("allChats", chat);
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
        db
          .get("user")
          .push({ id: newId, name: m, payed: false, isAdmin: false })
          .write().id;
        const token = jwt.sign({ id: newId }, "wlan2019");
        socket.emit("registerSuccessful", { token, name: m });
      }
    });

    socket.on("getPizzas", () => {
      const pizzas = db.get("pizza").value();
      io.emit("allPizzas", pizzas);
    });

    socket.on("orderPizza", p => {
      const newId = shortid.generate();
      const newPizza = db
        .get("pizza")
        .push({
          id: newId,
          user: p.id,
          name: p.name,
          number: p.number,
          preis: p.preis,
          bemerkungen: p.bemerkungen
        })
        .write();
      io.emit("allPizzas", newPizza);
    });

    socket.on("deletePizza", p => {
      const id = p.id;
      db.get("pizza")
        .remove({ id })
        .write();
      const pizzas = db.get("pizza").value();
      io.emit("allPizzas", pizzas);
    });

    socket.on("setPayed", u => {
      const id = u.id;
      const payed = u.payed;
      const nu = db
        .get("user")
        .find({ id })
        .assign({ payed })
        .write();
      const users = db.get("user").value();
      io.emit("allUsers", users);
    });

    socket.on("deleteAllPizza", () => {
      db.get("pizza")
        .remove({})
        .write();
      const pizzas = db.get("pizza").value();
      io.emit("allPizzas", pizzas);
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
