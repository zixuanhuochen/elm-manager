<!--  -->
<template>
  <div id="home-echarts" class="echartsBox" ref="myChart"></div>
</template>

<script>
import * as echarts from "echarts/core";
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  BarChart,
]);

export default {
  name: "homeEcharts",
  props: ["weekDay", "weekData"],
  data() {
    return {
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
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.init()
    this.initData()
  },
  methods: {
    init() {
      var chartDom = document.getElementById("home-echarts");
      // chartDom.removeAttribute('_echarts_instance_')
      var myChart = echarts.init(chartDom);
      myChart.setOption(this.option, true);
    },

    initData() {
      this.option.xAxis.data = this.weekDay;
      this.option.series[0].data = this.weekData[0];
      this.option.series[1].data = this.weekData[1];
      this.option.series[2].data = this.weekData[2];
    },
  },

  // watch: {
  //   // weekDay: function () {
  //   //   console.log('触发');
  //   //   this.initData();
  //   //   this.init();
  //   // },
  //   weekData: function () {
  //     this.initData();
  //     this.init();
    
  //   },
  // },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.echartsBox {
  width: 90%;
  height: 600px;
}
</style>