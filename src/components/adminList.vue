<template>
  <div class="adminList">
    <headerTop :Breadcrumb="Breadcrumb"></headerTop>
    <el-card>
      <el-table
        :data="adminList"
        style="width: 100%"
        highlight-current-row
        border
      >
        <el-table-column type="index" width="80" label="#"></el-table-column>
        <el-table-column prop="user_name" label="姓名" width="250">
        </el-table-column>
        <el-table-column prop="create_time" label="日期" width="250">
        </el-table-column>
        <el-table-column prop="city" label="注册地址" width="250">
        </el-table-column>
        <el-table-column prop="admin" label="权限"> </el-table-column>
      </el-table>
      <paginationNav :total="total" @changePage="changePage"></paginationNav>
    </el-card>
  </div>
</template>

<script>
import { getAdminList, getAdminCount } from "@/network";
export default {
  name: "adminList",
  data() {
    return {
      Breadcrumb: ["数据管理", "管理员列表"],
      total: 0,
      adminListSize: {
        limit: 20,
        offset: 0,
      },
      adminList: [],
    };
  },
  mounted() {
    this.getAdminLists();
  },

  methods: {
    async getAdminLists() {
      const { data: result } = await getAdminList(this.adminListSize);
      if (result.status === 1) {
        this.adminList = result.data;
      } else {
        this.$message.error("获取管理员信息失败");
      }
      //  this.userList = result
      const { data: count } = await getAdminCount();
      if (count.status === 1) {
        this.total = count.count;
      } else {
        this.$message.error("获取管理员信息失败");
      }
    },
    changePage(val) {
      this.adminListSize.offset = (val - 1)*20;
      this.getAdminLists();
    },
  },
};
</script>

<style>
</style>