<template>
  <div class="userList">
    <headerTop :Breadcrumb="Breadcrumb"></headerTop>
    <h1>数据统计</h1>
    <div class="statistical">
      <el-row style="marginBottom: 10px">
        <el-col :span="4"
          ><div class="data_list today_head">
            <span class="data_num head">当日数据：</span>
          </div></el-col
        >
        <el-col :span="4"><div class="data_list">
            <span class="data_num">{{ userCount }}</span> 新增用户
          </div></el-col>
        <el-col :span="4"><div class="data_list">
            <span class="data_num">{{ orderCount }}</span> 新增订单
          </div></el-col>
        <el-col :span="4"><div class="data_list">
            <span class="data_num">{{ adminCount }}</span> 新增管理员
          </div></el-col>
      </el-row>
      <el-row>
        <el-col :span="4"
          ><div class="data_list all_head">
            <span class="data_num head">总数据：</span>
          </div></el-col
        >
        <el-col :span="4"
          ><div class="data_list">
            <span class="data_num">{{ allUserCount }}</span> 注册用户
          </div></el-col
        >
        <el-col :span="4"
          ><div class="data_list">
            <span class="data_num">{{ allOrderCount }}</span> 订单
          </div></el-col
        >
        <el-col :span="4"
          ><div class="data_list">
            <span class="data_num">{{ allAdminCount }}</span> 管理员
          </div></el-col
        >
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      Breadcrumb: [""],
    };
  },

  methods: {},
};
</script>

<style lang="less">
h1 {
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
}
.statistical {
  padding: 20px;
  margin-bottom: 40px;

  .data_list {
    text-align: center;
    font-size: 14px;
    color: #666;
    border-radius: 6px;
    background: #e5e9f2;
    margin: 0 10px;
    padding: 5px;
    .data_num {
      color: #333;
      font-size: 26px;
    }
    .head {
      border-radius: 6px;
      color: #fff;
      display: inline-block;
    }
  }
  .today_head {
    background: #ff9800;
  }
  .all_head {
    background: #20a0ff;
  }
}
</style>