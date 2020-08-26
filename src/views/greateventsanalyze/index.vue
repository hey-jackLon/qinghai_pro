<template>
  <div class="dashboard-container">
    <con-form :events="events" @change="change" @mainTargetChange="mainTargetChange" />
    <con-table :table-data="tableData" :main-target="main_target" :compare-mode="compareMode" @rowClick="handlerRowClick" />
    <div style="width:100%;display:flex;">
      <div style="width:50%;height:350px;">
        <chart-line id="chartline" width="100%" height="100%" :chart-option="lineoption" />
      </div>
      <div style="width:50%;height:350px;">
        <chart-pie id="chartpie" width="100%" height="100%" :chart-option="pieoption" />
      </div>
    </div>
  </div>
</template>

<script>
import { getMajorEventList, getEventAnalysis } from '@/api/greateventsmanager/index'
import conForm from './form.vue'
import conTable from './table.vue'
import chartLine from '@/components/chart/_line'
import chartPie from '@/components/chart/_pie'
export default {
  name: 'Dashboard',
  components: {
    conForm,
    conTable,
    chartLine,
    chartPie
  },
  data() {
    return {
      events: [],
      tableData: null,
      main_target: [],
      compareMode: [],
      lineoption: {
        title: ''
      },
      pieoption: {
        title: {
          text: '客货车交通量对比分析',
          left: 'center'
        },
        legend: {
          bottom: 'bottom',
          left: 'center',
          data: ['客车', '货车']
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
    getMajorEventList().then(res => {
      this.events = res
    })
  },
  methods: {
    change(e) {
      const params = {}
      let data = null
      this.events.forEach(function(item, index) {
        if (e.event_name === item.eventId) data = item
      })
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

      getEventAnalysis(params, data).then(res => {
        this.compareMode = e.compare_mode
        this.tableData = res
        this.lineoption.title = `${data.eventName}${res[0].GCRQ}-${res[res.length - 1].GCRQ}交通量变化趋势`
        this.lineoption.legendData = ['交通量', '汽车', '货车', '客车']
        this.lineoption.series = []
        this.lineoption.legendData.forEach(function(item, index) {
          const seriesData = []
          for (let k = 0; k < res.length; k++) {
            if (index === 0) {
              seriesData.push(res[k].TOTAL_DL)
            } else if (index === 1) {
              seriesData.push(res[k].QC)
            } else if (index === 2) {
              seriesData.push(res[k].HC)
            } else {
              seriesData.push(res[k].KC)
            }
          }
          this.lineoption.series.push({
            name: item,
            type: 'line',
            smooth: true,
            data: seriesData
          })
        }.bind(this))
        this.lineoption.xAxisData = []
        for (let i = 0; i < res.length; i++) {
          this.lineoption.xAxisData.push(res[i].GCRQ)
        }

        this.pieoption.title.text = `${data.eventName}[${res[0].GCRQ}]客货车交通量对比分析`
        this.pieoption.series[0].data = []
        for (let i = 0; i < this.pieoption.legend.data.length; i++) {
          if (this.pieoption.legend.data[i] === '客车') {
            this.pieoption.series[0].data.push({
              name: '客车',
              value: res[0].KC
            })
          } else {
            this.pieoption.series[0].data.push({
              name: '货车',
              value: res[0].HC
            })
          }
        }
      })
    },
    mainTargetChange(e) {
      this.main_target = e
    },
    handlerRowClick(e) {
      this.pieoption.title.text = this.pieoption.title.text.replace(/\[.*?\]/g, `[${e.GCRQ}]`)
      this.pieoption.series[0].data = []
      for (let i = 0; i < this.pieoption.legend.data.length; i++) {
        if (this.pieoption.legend.data[i] === '客车') {
          this.pieoption.series[0].data.push({
            name: '客车',
            value: e.KC
          })
        } else {
          this.pieoption.series[0].data.push({
            name: '货车',
            value: e.HC
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
