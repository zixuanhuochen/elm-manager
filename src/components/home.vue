<template>
  <div class="userList">
    <headerTop :Breadcrumb="Breadcrumb"></headerTop>
    <h1>数据统计</h1>
    <el-row>
      <el-col :span="22" :offset="4">
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
      <homeEcharts :options="option"></homeEcharts>
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
      timer: "",
      weekDay: [],
      weekData: [[], [], []],
      option: {
        title: {
          text: "走势图",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["新注册用户", "新增订单", "新增管理员"],
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            dataView: { readOnly: false },
            magicType: { type: ["line", "bar"] },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: null,
        },
        yAxis: [
          {
            type: "value",
            name: "用户",
            min: 0,
            max: 200,
            position: "left",
            axisLine: {
              lineStyle: {
                color: "#999",
              },
            },
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "订单",
            min: 0,
            max: 200,
            position: "right",
            axisLine: {
              lineStyle: {
                color: "#999",
              },
            },
            axisLabel: {
              formatter: "{value}",
            },
          },
        ],
        series: [
          {
            name: "新注册用户",
            type: "line",
            data: null,
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" },
              ],
            },
          },
          {
            name: "新增订单",
            type: "line",
            data: null,
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" },
              ],
            },
          },
          {
            name: "新增管理员",
            type: "line",
            data: null,
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" },
              ],
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.initDate();
  },
  beforeDestroy() {
    clearTimeout(this.timer);
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
    async getWeekDay() {
      let dtime = new Date().getTime();
      for (let i = 0; i < 7; i++) {
        let day = dtime - 86400000 * i;
        // day.daytime().format("YYYY-MM-DD")
        this.weekDay.unshift(daytime(day).format("YYYY-MM-DD"));
      }
     
      for (let item of this.weekDay) {
        const res = await  Promise.all([
          dayRegisterUser(item),
          dayOrderCount(item),
          dayAdminCount(item),
        ]);
        this.weekData[0].push(res[0].data.count);
        this.weekData[1].push(res[1].data.count);
        this.weekData[2].push(res[2].data.count);
        
      }
      this.option.xAxis.data = this.weekDay;
      this.option.series[0].data = this.weekData[0];
      this.option.series[1].data = this.weekData[1];
      this.option.series[2].data = this.weekData[2];
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