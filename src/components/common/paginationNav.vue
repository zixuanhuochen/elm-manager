<template>
  <el-pagination
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="1"
    :page-sizes="[20]"
    :page-size='20'
    layout="total,  prev, pager, next, jumper"
    :total="total"
    style="marginTop:15px"
  >
  </el-pagination>
</template>

<script>
export default {
  name: "paginationNav",
  props:['total'],
  data() {
    return {   
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.$emit('changePage',val);
    },
  },
};
</script>

<style>
</style>