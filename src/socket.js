export default vm => {
  const c = vm.$socket;
  c.on("connect", () => {
    vm.$store.dispatch("refreshChat", {
      time: Date.now(),
      message: `Vrbundn...`
    });
  });

  c.on("chatMessage", m => {
    vm.$store.dispatch("refreshChat", m);
  });

  c.on("registerSuccessful", m => {
    c.emit("getUsers");
    c.emit("getPizzas");
    c.emit("getChats");
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

  c.on("allPizzas", m => {
    vm.$store.dispatch("allPizzas", m);
  });

  c.on("allChats", m => {
    vm.$store.dispatch("allChat", m);
  });
};
