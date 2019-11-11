<template>
  <div id="teilnehmer">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
          <b>Teilnehmer</b>&nbsp;
          <el-tag size="mini" type="success">{{teilnehmer.length}}</el-tag>
        </span>
      </div>
      <div>
        <el-table :data="teilnehmer" style="width: 100%">
          <el-table-column prop="name" label="Name"></el-table-column>
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
    }
  }
};
</script>

<style>
</style>
