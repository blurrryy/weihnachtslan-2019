export default vm => {
  const c = vm.$socket;
  c.on("connect", () => {
    vm.$store.dispatch("refreshChat", {
      time: Date.now(),
      message: `Verbunden...`
    });
  });

  c.on("chatMessage", m => {
    vm.$store.dispatch("refreshChat", m);
  });

  c.on("registerSuccessful", m => {
    c.emit("getUsers");
    vm.$store.dispatch("registerSuccessful", m);
  });

  c.on("registerError", m => {
    vm.$message.error(m);
    vm.$store.dispatch("errorCleanup");
    vm.$store.dispatch("setLoading", false);
  });

  c.on("allUsers", m => {
    vm.$store.dispatch("allUsers", m);
  });
};
