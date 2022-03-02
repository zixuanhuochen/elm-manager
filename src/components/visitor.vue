<template>
  <div class="visitor">
    <headerTop :Breadcrumb="Breadcrumb"></headerTop>
    <div id="echartsPic"></div>
  </div>
</template>

<script>
import * as echarts from "echarts/core";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);
import { getUserScatter } from "@/network";
export default {
  name: "visitor",
  data() {
    return {
      Breadcrumb: ["图表", "用户分布"],
      user_city: {
        beijing: null,
        hangzhou: null,
        qita: null,
        shanghai: null,
        shenzhen: null,
      },
      show: false,
    };
  },

  mounted() {
    this.userScatter();
      this.myChart = echarts.init(document.getElementById("echartsPic"));
      this.initData();
   
  },

  methods: {
    initData() {
      const option = {
        title: {
          text: "用户分布",
          subtext: "",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },

        legend: {
          orient: "vertical",
          left: "left",
          data: ["北京", "上海", "深圳", "杭州", "其他"],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "50%",
            center: ["50%", "60%"],
            data: [
              { value: this.user_city.beijing, name: "北京" },
              { value: this.user_city.hangzhou, name: "杭州" },
              { value: this.user_city.qita, name: "其他" },
              { value: this.user_city.shanghai, name: "上海" },
              { value: this.user_city.shenzhen, name: "深圳" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      option && this.myChart.setOption(option);
    },
    async userScatter() {
      const result = await getUserScatter();
      console.log(result);
      this.user_city = result.data.user_city;
    },
  },
  watch: {
    user_city: {
      handler () {
        this.initData();
      },
      deep: true,
    },
  },
};
</script>

<style>
.echartsPic {
  height: 100%;
}
#echartsPic {
  margin: 0 auto;
  width: 90%;
  height: 750px;
  margin-top: 30px;
}
</style>