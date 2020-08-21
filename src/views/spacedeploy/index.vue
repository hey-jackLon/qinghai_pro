<template>
  <div class="dashboard-container">
    <con-form :events="events" @change="change" @mainTargetChange="mainTargetChange" />
    <con-table :table-data="tableData" :main-target="main_target" @rowClick="handlerRowClick" />
    <div style="width:100%;display:flex;">
      <div style="width:50%;height:350px;">
        <line-bar id="chartline" width="100%" height="100%" :chart-option="lineoption" />
      </div>
      <div style="width:50%;height:350px;">
        <chart-pie id="chartpie" width="100%" height="100%" :chart-option="pieoption" />
      </div>
    </div>
  </div>
</template>

<script>
import { getTourismChannelList, getChannelRegionAnalysis } from '@/api/travelroadmanager/index'
import conForm from './form.vue'
import conTable from './table.vue'
import lineBar from '@/components/chart/lineAndBar'
import chartPie from '@/components/chart/_pie'
export default {
  name: 'Dashboard',
  components: {
    conForm,
    conTable,
    lineBar,
    chartPie
  },
  data() {
    return {
      events: [],
      tableData: null,
      main_target: [],
      lineoption: {
        title: {
          text: '客货车交通量对比分析',
          left: 'center'
        },
        legend: {
          bottom: 'bottom',
          left: 'center',
          data: ['大客车', '小客车', '客车']
        },
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
      },
      pieoption: {
        title: {
          text: '客货车交通量对比分析',
          left: 'center'
        },
        legend: {
          bottom: 'bottom',
          left: 'center',
          data: ['大客车', '小客车']
        },
        series: [
          {
            name: '交通量',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  created() {
    getTourismChannelList().then(res => {
      this.events = res
    })
  },
  methods: {
    change(e) {
      const params = {}
      const data = []
      for (let i = 0; i < e.odRegion.length; i++) {
        for (let k = 0; k < this.events.length; k++) {
          if (e.odRegion[i] === this.events[k].channelId) {
            data.push(this.events[k])
          }
        }
      }
      if (e.compare_mode.length > 0) {
        if (e.compare_mode.indexOf('同比') !== -1) {
          params.tb = true
        } else {
          params.tb = false
        }
        if (e.compare_mode.indexOf('环比') !== -1) {
          params.hb = true
        } else {
          params.hb = false
        }
      } else {
        params.tb = false
        params.hb = false
      }
      params.orderTime = e.orderTime
      params.intervalId = e.intervalId
      getChannelRegionAnalysis(params, data).then(res => {
        for (let i = 0; i < res.length; i++) {
          for (let k = 0; k < this.events.length; k++) {
            if (res[i].CHANNEL_ID === this.events[k].channelId) {
              res[i].channelName = this.events[k].channelName
            }
          }
        }
        this.tableData = res

        this.lineoption.title.text = `多个公路通道${params.orderTime}客车流量对比分析`
        this.lineoption.xAxis.data = []
        for (let i = 0; i < res.length; i++) {
          this.lineoption.xAxis.data.push(res[i].channelName)
        }
        this.lineoption.series = []
        this.lineoption.legend.data.forEach(function(item, index) {
          const seriesData = []
          for (let k = 0; k < res.length; k++) {
            if (index === 0) {
              seriesData.push(res[k].DKC)
            } else if (index === 1) {
              seriesData.push(res[k].XKC)
            } else {
              seriesData.push(res[k].KC)
            }
          }
          if (index === 2) {
            this.lineoption.series.push({
              name: item,
              type: 'line',
              yAxisIndex: 1,
              data: seriesData
            })
          } else {
            this.lineoption.series.push({
              name: item,
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              data: seriesData
            })
          }
        }.bind(this))

        this.pieoption.title.text = `[${data[0].channelName}]${params.orderTime}客车车型结构`
        this.pieoption.series[0].data = []
        for (let i = 0; i < this.pieoption.legend.data.length; i++) {
          if (this.pieoption.legend.data[i] === '大客车') {
            this.pieoption.series[0].data.push({
              name: '大客车',
              value: res[0].DKC
            })
          } else {
            this.pieoption.series[0].data.push({
              name: '小客车',
              value: res[0].XKC
            })
          }
        }
      })
    },
    mainTargetChange(e) {
      this.main_target = e
    },
    handlerRowClick(e) {
      this.pieoption.title.text = this.pieoption.title.text.replace(/\[.*?\]/g, `[${e.channelName}]`)
      this.pieoption.series[0].data = []
      for (let i = 0; i < this.pieoption.legend.data.length; i++) {
        if (this.pieoption.legend.data[i] === '大客车') {
          this.pieoption.series[0].data.push({
            name: '大客车',
            value: e.DKC
          })
        } else {
          this.pieoption.series[0].data.push({
            name: '小客车',
            value: e.XKC
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
}
</style>
