import Vue from "vue";
import App from "./App.vue";
// import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/de";

import io from "socket.io-client";

const connection = io("wlan.lan:3000");
Vue.config.productionTip = false;

Vue.prototype.$socket = connection;

Vue.use(ElementUI, { locale });

new Vue({
  // router,
  store,
  render: (h) => h(App),
}).$mount("#app");
