<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    tableData: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    tableData: {
      handler(n, o) {
        this.initChart()
      },
      deep: true
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      const legendData = ['客车', '货车', '作业车']
      const xAxisData = []
      const series0Data = []
      const series1Data = []
      const series2Data = []
      for (let i = 0; i < this.tableData.length; i++) {
        xAxisData.push(this.tableData[i].name)
        series0Data.push(this.tableData[i].kc)
        series1Data.push(this.tableData[i].hc)
        series2Data.push(this.tableData[i].zyc)
      }
      // this.tableData
      // debugger
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        title: {
          text: '交通量对比分析',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: legendData,
          bottom: 'bottom',
          left: 'center'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        yAxis: {
          type: 'value'
        },
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        series: [
          {
            name: legendData[0],
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: series0Data
          },
          {
            name: legendData[1],
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: series1Data
          },
          {
            name: legendData[2],
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: series2Data
          }
        ]
      })
    }
  }
}
</script>
