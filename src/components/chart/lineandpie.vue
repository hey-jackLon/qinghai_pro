<template>
  <div class="chart-wrap">
    <div id="lineandpie" class="chart-container" />
  </div>
</template>

<script>
export default {
  props: {
    line: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  mounted() {
    this.initEcharts('lineandpie', this.line)
  },
  methods: {
    initEcharts(id, options) {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById(id))
      // 绘制图表
      myChart.setOption(options)
    }
  }
}
</script>

<style lang="scss" scoped>
.chart{
  &-wrap{
    width: 100%;
  }
  &-container{
    width: 100%;
  }
}
</style>
