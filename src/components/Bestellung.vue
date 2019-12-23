<template>
  <div id="bestellung">
    <el-card class="box-card">
      <div slot="header">
        <span>
          <b>Pizza Bestelling aufgaabm</b>&nbsp;
        </span>
      </div>
      <div>
        <el-row>
          <el-col :span="12">
            <el-form
              ref="form"
              :model="form"
              label-width="120px"
              :hide-required-asterisk="true"
              :rules="rules"
            >
              <el-form-item label="Nummer" prop="number">
                <el-input v-model="form.number" placeholder="Die ausm Blaadl"></el-input>
              </el-form-item>
              <el-form-item label="Preis" prop="preis">
                <el-input v-model="form.preis" @change="checkNumber" placeholder="Wus kost">
                  <template slot="append">€</template>
                </el-input>
              </el-form-item>
              <el-form-item label="Bemerkungen" prop="bemerkungen">
                <el-input
                  v-model="form.bemerkungen"
                  placeholder="Greeß, wus drzu, wus wag un Zeich"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="success" @click="order">Aufgaabm</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        number: "",
        preis: "",
        bemerkungen: ""
      },
      rules: {
        number: [{ required: true, message: "Nummer muss sei!" }],
        preis: [
          {
            required: true,
            message: "Immesist is ner dr Duud."
          }
        ]
      }
    };
  },
  methods: {
    order() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$socket.emit("orderPizza", {
            id: this.me.id,
            name: this.me.name,
            ...this.form
          });
          this.$refs.form.resetFields();
        }
      });
    },
    checkNumber(val) {
      if (!val) return;
      if (/\d?\,\d+/.test(val)) {
        val = val.replace(/\,/g, ".");
      }
      val = parseFloat(val);
      if (isNaN(val)) {
        this.form.preis = "";
        return;
      }
      this.form.preis = val.toFixed(2);
    }
  },
  computed: {
    me() {
      return this.$store.getters.getMe;
    }
  }
};
</script>

<style>
</style>