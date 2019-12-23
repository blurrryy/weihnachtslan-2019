<template>
  <div id="chat">
    <el-card class="box-card">
      <div slot="header">
        <span>
          <b>Dischgur (die gunge Leid soogn a Chat)</b>
        </span>
      </div>
      <div>
        <div id="chatVerlauf">
          <el-row v-for="(m, i) in messages" v-bind:key="i" :gutter="10">
            <el-col :span="5">
              <small style="color:lightgrey">
                <i>~{{m.time}}</i>
              </small>
            </el-col>
            <el-col :span="19">
              <span v-html="m.message"></span>
            </el-col>
          </el-row>
        </div>
        <el-row>
          <el-divider></el-divider>
        </el-row>
        <el-row>
          <el-input v-model="msgBox" placeholder="Soogn" @keyup.enter.native="sendMessage"></el-input>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msgBox: "",
      changeMe: 0
    };
  },
  methods: {
    sendMessage() {
      const m = this.msgBox;
      if (m.length < 1) return;
      this.$socket.emit("getChats");
      this.$socket.emit("chatMessage", {
        username: this.$store.state.name,
        message: m
      });
      this.msgBox = "";
    },
    scrollLock() {
      let div = document.getElementById("chatVerlauf");
      if (div) {
        div.scrollTop = div.scrollHeight;
      }
    }
  },
  computed: {
    messages() {
      return this.$store.getters.messages;
    },
    mlen() {
      return this.$store.state.chat.length;
    }
  },
  watch: {
    mlen(n, o) {
      if (n > o) this.$nextTick(() => chatScroll());
    }
  },
  mounted() {
    window.chatScroll = this.scrollLock;
    setInterval(() => {
      this.$store.dispatch("triggerRefresher");
    }, 1000 * 15);
  }
};
</script>

<style scoped>
#chatVerlauf {
  font-family: monospace !important;
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  font-size: 15px;
}
</style>
