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
          <h1 style="font-size:35px">Willkommen zur WeihnachtsLAN 2019</h1>
        </el-row>
        <h3>
          Wir begrüßen dich, {{displayName}}!
          <el-tag type="success" v-if="me? me.payed : false">bezahlt</el-tag>
          <el-tag type="danger" v-if="me? !me.payed : false">nicht bezahlt</el-tag>
        </h3>
        <el-row :gutter="10">
          <el-col :span="12">
            <teilnehmer></teilnehmer>
          </el-col>
          <el-col :span="12">
            <chat></chat>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-container v-if="!loggedIn &&!loading">
      <el-container>
        <el-main>
          <el-row type="flex" justify="center" align="middle">
            <h1 style="font-size:35px">Willkommen zur WeihnachtsLAN 2019</h1>
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
                <br>Wenn du "Hans Helmut Kohl-Blabla" heißt, darfst du dich schon "Helmut K." nennen.
                <br>Gibt jetzt einfach deinen Namen ein und drück ENTER!111einseins
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
export default {
  components: {
    Chat,
    Teilnehmer
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
body {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>
