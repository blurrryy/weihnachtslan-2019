import Vue from "vue";
import Vuex from "vuex";
import moment from "moment";

Vue.use(Vuex);
moment.locale("de");

export default new Vuex.Store({
  state: {
    loading: true,
    loadingText: "Bitte warten...",
    loggedIn: false,
    user: [],
    chat: [],
    refresher: false,
    token: null,
    name: null,
    allUsers: [],
    allPizzas: []
  },
  getters: {
    messages(state) {
      state.refresher;
      return state.chat.map(x => ({
        time: moment(x.time).fromNow(),
        message: x.message
      }));
    },
    getMe(state) {
      return state.allUsers.find(x => x.name === state.name);
    }
  },
  mutations: {
    ALTER_CHAT(state, payload) {
      state.chat.push(payload);
    },
    ALTER_REFRESHER(state) {
      state.refresher = !state.refresher;
    },
    SET_LOGIN(state, payload) {
      state.loggedIn = payload;
    },
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
    SET_TOKEN(state, payload) {
      state.token = payload;
    },
    SET_NAME(state, payload) {
      state.name = payload;
    },
    SET_LOADING_TEXT(state, payload) {
      state.loadingText = payload;
    },
    SET_ALL_PIZZAS(state, payload) {
      state.allPizzas = payload;
    },
    SET_ALL_USERS(state, payload) {
      state.allUsers = payload;
    },
    SET_ALL_CHAT(state, payload) {
      if (payload && payload.length > 0) state.chat = payload;
    }
  },
  actions: {
    refreshChat(ctx, payload) {
      ctx.commit("ALTER_CHAT", payload);
    },
    triggerRefresher(ctx) {
      ctx.commit("ALTER_REFRESHER");
    },
    setLoading(ctx, payload) {
      ctx.commit("SET_LOADING", payload);
    },
    setLoadingText(ctx, payload) {
      ctx.commit("SET_LOADING_TEXT", payload);
    },
    errorCleanup(ctx) {
      localStorage.removeItem("login_token");
      ctx.commit("SET_TOKEN", null);
      ctx.commit("SET_NAME", null);
      ctx.commit("SET_LOGIN", false);
    },
    registerSuccessful(ctx, payload) {
      localStorage.setItem("login_token", payload.token);
      ctx.commit("SET_LOGIN", true);
      ctx.commit("SET_TOKEN", payload.token);
      ctx.commit("SET_NAME", payload.name);
      ctx.commit("SET_LOADING", false);
    },
    checkForTokenLogin(ctx, payload) {
      ctx.commit("SET_LOADING", true);
      ctx.commit("SET_LOADING_TEXT", "Überprüfe Login...");
      const token = localStorage.getItem("login_token");
      if (token) {
        payload.emit("checkForTokenLogin", token);
      } else {
        ctx.commit("SET_LOADING", false);
      }
    },
    allUsers(ctx, payload) {
      ctx.commit("SET_ALL_USERS", payload);
    },
    allPizzas(ctx, payload) {
      ctx.commit("SET_ALL_PIZZAS", payload);
    },
    allChat(ctx, payload) {
      ctx.commit("SET_ALL_CHAT", payload);
    }
  },
  modules: {}
});
