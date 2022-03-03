<template>
  <div class="userList">
    <headerTop :Breadcrumb="Breadcrumb"></headerTop>
    <h1>数据统计</h1>
    <el-row>
      <el-col :span="18" :offset="6">
        <div class="statistical">
          <el-row style="marginbottom: 10px">
            <el-col :span="4"
              ><div class="data_list today_head">
                <span class="data_num head">当日数据：</span>
              </div></el-col
            >
            <el-col :span="4"
              ><div class="data_list">
                <span class="data_num">{{ userCount }}</span> 新增用户
              </div></el-col
            >
            <el-col :span="4"
              ><div class="data_list">
                <span class="data_num">{{ orderCount }}</span> 新增订单
              </div></el-col
            >
            <el-col :span="4"
              ><div class="data_list">
                <span class="data_num">{{ adminCount }}</span> 新增管理员
              </div></el-col
            >
          </el-row>
          <el-row style="margin-top: 15px">
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
      </el-col>
    </el-row>
    <el-row>
      <homeEcharts :weekDay="weekDay" :weekData="weekData"></homeEcharts>
    </el-row>
  </div>
</template>

<script>
import daytime from "time-formater";
import {
  dayRegisterUser,
  registerUser,
  dayOrderCount,
  getOrderCount,
  getAdminCount,
  dayAdminCount,
} from "@/network";
import homeEcharts from "./common/homeEcharts.vue";
export default {
  components: { homeEcharts },
  name: "Home",
  data() {
    return {
      Breadcrumb: [""],
      userCount: null,
      orderCount: null,
      adminCount: null,
      allUserCount: null,
      allOrderCount: null,
      allAdminCount: null,
      today: "",
      weekDay: [],
      weekData: [[], [], []],
    };
  },
  mounted() {
    this.initDate();
  },
  methods: {
    initDate() {
      this.today = daytime().format("YYYY-MM-DD");
      Promise.all([
        dayRegisterUser(this.today),
        registerUser(),
        dayOrderCount(this.today),
        getOrderCount(),
        dayAdminCount(this.today),
        getAdminCount(),
      ])
        .then((res) => {
          this.userCount = res[0].data.count;
          this.allUserCount = res[1].data.count;
          this.orderCount = res[2].data.count;
          this.allOrderCount = res[3].data.count;
          this.adminCount = res[4].data.count;
          this.allAdminCount = res[5].data.count;
        })
        .catch((error) => console.log(error));
      this.getWeekDay();
    },
    getWeekDay() {
      let dtime = new Date().getTime();
      for (let i = 0; i < 7; i++) {
        let day = dtime - 86400000 * i;
        // day.daytime().format("YYYY-MM-DD")
        this.weekDay.unshift(daytime(day).format("YYYY-MM-DD"));
      }
      let weekday = [[], [], []];
      this.weekDay.forEach((item) => {
        Promise.all([
          dayRegisterUser(item),
          dayOrderCount(item),
          dayAdminCount(item),
        ])
          .then((res) => {
            weekday[0].push(res[0].data.count);
            weekday[1].push(res[1].data.count);
            weekday[2].push(res[2].data.count);
          })
          .catch((error) => console.log(error));
      });
      this.weekData = weekday;
    },
  },
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