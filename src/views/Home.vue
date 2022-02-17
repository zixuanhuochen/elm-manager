<template>
  <div>
    <el-row >
      <el-col :span="4" style="height:100vh;background-color: #324057;">222</el-col>
      <el-col :span="20">111</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },

  methods: {
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  },
};
</script>

<style>
</style>