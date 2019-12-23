<template>
  <div
    id="app"
    v-loading.fullscreen.lock="loading"
    :element-loading-text="loadingText"
    element-loading-spinner="el-icon-loading"
  >
    <el-container v-if="loggedIn &&!loading">
      <el-main>
        <el-row type="flex" justify="center" align="middle">
          <h1 id="wlan_h">WeihnachtsLAN 2019</h1>
        </el-row>
        <el-row type="flex" justify="center" align="middle">
          <h1 id="wlan_h2">- Wie Hutznomd, ner mit Krieg -</h1>
        </el-row>
        <h3 style="color:white">
          Ne Glick Auf, {{displayName}}!
          <el-tag type="success" v-if="me? me.payed : false">Gald gaabm</el-tag>
          <el-tag type="danger" v-if="me? !me.payed : false">Zech geprellt</el-tag>&nbsp;
          <small
            v-if="me && !me.payed"
            style="color:white"
          >Du bist e older Zechpreller. Dis geheert siech net. Wär scheen, wennde mol noch bezohln dätst.</small>
        </h3>

        <el-row :gutter="10">
          <el-col :span="12">
            <teilnehmer></teilnehmer>
          </el-col>
          <el-col :span="12">
            <chat></chat>
          </el-col>
        </el-row>
        <el-row>
          &nbsp;
          <br />
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <pizza></pizza>
          </el-col>
          <el-col :span="12">
            <bestellung></bestellung>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-container v-if="!loggedIn &&!loading">
      <el-container>
        <el-main>
          <el-row type="flex" justify="center" align="middle">
            <h1 id="wlan_h">Willkommen zur WeihnachtsLAN 2019</h1>
          </el-row>
          <el-row type="flex" justify="center" align="middle">
            <h1>Bitte verrate uns deinen richtigen Namen</h1>
          </el-row>
          <el-row type="flex" justify="center" align="middle">
            <el-col :span="10">
              <el-input
                v-model="name"
                placeholder="Dein Name hier"
                @keyup.enter.native="registerName"
              ></el-input>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center" align="middle">
            <el-col :span="10">
              <p>
                Mit "richtig" meinen wir einen Namen, mit dem wir dich zuordnen können.
                <br />Wenn du "Hans Helmut Kohl-Blabla" heißt, darfst du dich schon "Helmut K." nennen.
                <br />Gibt jetzt einfach deinen Namen ein und drück ENTER!111einseins
              </p>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import socketIO from "./socket";
import Chat from "./components/Chat.vue";
import Teilnehmer from "./components/Teilnehmer.vue";
import Pizza from "./components/Pizza.vue";
import Bestellung from "./components/Bestellung.vue";
export default {
  components: {
    Chat,
    Teilnehmer,
    Pizza,
    Bestellung
  },
  data() {
    return {
      name: ""
    };
  },
  methods: {
    registerName() {
      if (this.name.length < 5) {
        this.$message.error(`Wir haben dich nach deinem Namen gefragt!`);
      }
      this.$store.dispatch("setLoading", true);
      this.$store.dispatch(
        "setLoadingText",
        "Registrierung wird abgeschlossen..."
      );
      this.$socket.emit("registerUser", this.name);
    }
  },
  computed: {
    messages() {
      return this.$store.state.chat;
    },
    displayName() {
      return this.$store.state.name;
    },
    loggedIn() {
      return this.$store.state.loggedIn;
    },
    loading() {
      return this.$store.state.loading;
    },
    loadingText() {
      return this.$store.state.loadingText;
    },
    me() {
      return this.$store.getters.getMe;
    }
  },
  created() {
    socketIO(this);
    this.$store.dispatch("checkForTokenLogin", this.$socket);
  }
};
</script>


<style>
@font-face {
  font-family: "PT-Sans";
  src: url("assets/PTSans-Regular.ttf");
}

@font-face {
  font-family: "Shadows Into Light";
  src: url("assets/ShadowsIntoLight-Regular.ttf");
}

body {
  min-height: 100vh;
  font-family: "PT-Sans", "Helvetica Neue", Helvetica, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

  background-image: linear-gradient(to top, #00c6fb 0%, #005bea 100%);
}

#wlan_h {
  color: white;
  font-size: 5rem;
  font-family: "Shadows Into Light";
  margin: 1rem;
  margin-bottom: 0;
}

#wlan_h2 {
  color: white;
  font-size: 3rem !important;
  font-family: "Shadows Into Light";
  margin: 0;
  margin-bottom: 1rem;
}
</style>
