<template>
  <div class="userList">
    <headerTop :Breadcrumb="Breadcrumb"></headerTop>
    <el-card>
      <el-table :data="userList" style="width: 100%" highlight-current-row>
        <el-table-column type="index" width="150" label="#"></el-table-column>
        <el-table-column prop="registe_time" label="注册日期" width="280">
        </el-table-column>
        <el-table-column prop="username" label="注册姓名" width="280">
        </el-table-column>
        <el-table-column prop="city" label="注册地址"> </el-table-column>
      </el-table>
      <paginationNav :total="total" @changePage="changePage"></paginationNav>
    </el-card>
  </div>
</template>

<script>
import { getUserList, getUserCount } from "@/network";
export default {
  name: "userList",
  data() {
    return {
      Breadcrumb: ["数据管理", "用户列表"],
      userListSize: {
        limit: 20,
        offset: 0,
      },
      userList: [],
      total: 0,
    };
  },
  mounted() {
    this.getUserLists();
  },
  methods: {
    async getUserLists() {
      const { data: result } = await getUserList(this.userListSize);
     this.userList = result
      const { data: count } = await getUserCount();
      if(count.status === 1){
        this.total = count.count
      }else{
        this.$message.error('获取用户信息失败')
      }
    },

    changePage(val) {
      this.userListSize.offset = (val - 1) *20
      this.getUserLists();
    },
  },
};
</script>

<style>
.el-card {
  margin: 20px;
}
</style>