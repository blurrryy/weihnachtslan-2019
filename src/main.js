import Vue from "vue";
import App from "./App.vue";
// import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import io from "socket.io-client";

const connection = io("localhost:3000");
Vue.config.productionTip = false;

Vue.prototype.$socket = connection;

Vue.use(ElementUI);

new Vue({
  // router,
  store,
  render: h => h(App)
}).$mount("#app");
