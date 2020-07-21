<template>
  <div class="chart-wrap">
    <div :id="id" class="chart-container" />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    option: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  mounted() {
    this.initEcharts(this.id, this.option)
  },
  methods: {
    initEcharts(id, options) {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById(id))
      // 绘制图表
      myChart.setOption(options)
    },
    updateEcharts() {
      this.initEcharts(this.id, this.option)
    }
  }
}
</script>

<style lang="scss" scoped>
.chart{
  &-wrap{
    width: 100%;
    height: 100%;
  }
  &-container{
    width: 100%;
    height: 100%;
  }
}
</style>
