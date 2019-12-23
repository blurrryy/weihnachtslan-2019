<template>
  <div id="pizza">
    <el-card class="box-card">
      <div slot="header">
        <span>
          <b>Pizza</b>&nbsp;
          <el-button
            size="mini"
            type="danger"
            @click="deleteAll()"
            v-if="me && me.isAdmin"
          >Fort mit dam Miest</el-button>
        </span>
      </div>
      <div>
        <el-table
          :data="allPizzas"
          :summary-method="getSummaries"
          show-summary
          empty-text="Habt wuhl kann Hunger, bleede Ziegn?"
        >
          <el-table-column label="Nummer" prop="number" width="100"></el-table-column>
          <el-table-column label="Preis" prop="preis" width="100"></el-table-column>
          <el-table-column label="Bemerkungen" prop="bemerkungen" width="270"></el-table-column>
          <el-table-column label="Name" prop="name"></el-table-column>
          <el-table-column label="Zeich" width="100">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                v-if="me && scope.row.user === me.id"
              >Leschn</el-button>
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
    me() {
      return this.$store.getters.getMe;
    },
    allPizzas() {
      return this.$store.state.allPizzas;
    }
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param;
      let sums = [`sei ${data.length}`, null, null, null];

      let preis = 0;
      data.forEach(x => {
        if (!isNaN(x.preis)) preis += parseFloat(x.preis);
      });

      preis = preis.toFixed(2);
      sums[1] = `kost ${preis}€`;

      return sums;
    },
    handleDelete(i, row) {
      let id = row.id;
      this.$socket.emit("deletePizza", {
        id
      });
    },
    deleteAll() {
      this.$socket.emit("deleteAllPizza");
    }
  }
};
</script>

<style>
</style>