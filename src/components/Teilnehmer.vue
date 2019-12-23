<template>
  <div id="teilnehmer">
    <el-card class="box-card">
      <div slot="header">
        <span>
          <b>Hiesche</b>&nbsp;
          <el-tag size="mini" type="success">{{teilnehmer.length}}</el-tag>
        </span>
      </div>
      <div>
        <el-table :data="teilnehmer" style="width: 100%">
          <el-table-column prop="name" label="Name"></el-table-column>
          <el-table-column label="Zeich" v-if="me && me.isAdmin">
            <template slot-scope="scope">
              <el-button
                size="mini"
                :type="scope.row.payed? 'success' : 'danger'"
                @click="togglePayed(scope.$index, scope.row)"
              >Bezohlstatus</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  computed: {
    teilnehmer() {
      return this.$store.state.allUsers;
    },
    me() {
      return this.$store.getters.getMe;
    }
  },
  methods: {
    togglePayed(id, row) {
      let newVal = {
        id: row.id,
        payed: !row.payed
      };

      this.$socket.emit("setPayed", newVal);
    }
  }
};
</script>

<style>
</style>
