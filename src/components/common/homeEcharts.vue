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
  props: {
    options: {
      type: Object,
    },
  },
  data() {
    return {
      chart: null, // echart实例
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
 methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.chart.setOption(this.options);
    },
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  watch: {
    //观察options的变化
    options: {
      handler(newVal, oldVal) {
        if (this.chart) {
          if (newVal) {
            this.chart.setOption(newVal, true);
          } else {
            this.chart.setOption(oldVal, true);
          }
        } else {
          this.initChart();
        }
      },
      deep: true, //对象内部属性的监听，关键。
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.echartsBox {
  width: 90%;
  height: 600px;
}
</style>