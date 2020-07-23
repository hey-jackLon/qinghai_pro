<template>
  <div class="dashboard-container">
    <con-form :events="events" :maintarget="mainTarget" :comparemode="compareMode" @change="change" />
    <con-table />
    <div style="width:100%;display:flex;">
      <div style="width:50%;height:350px;">
        <chart-container id="line" ref="linechart" :option="line" />
      </div>
      <div style="width:50%;height:350px;">
        <chart-container id="pie" ref="piechart" :option="pie" />
      </div>
    </div>
  </div>
</template>

<script>
import conForm from './form.vue'
import conTable from './table.vue'
import chartContainer from '@/components/chart/index.vue'
import { line, pie } from '@/components/chart/chartoptions.js'
export default {
  name: 'Dashboard',
  components: {
    conForm,
    conTable,
    chartContainer
    // chartLine
  },
  data() {
    return {
      events: [
        {
          label: '2019年环青海湖公路国际公路自行车赛',
          value: 2020001
        },
        {
          label: '2019年环青海湖公路国际公路自行车赛2',
          value: 20200034
        }
      ],
      mainTarget: [
        {
          label: '交通量当量',
          value: 20200002
        },
        {
          label: '交通量自然量',
          value: 20200003
        },
        {
          label: '汽车当量',
          value: 20200004
        },
        {
          label: '汽车自然量',
          value: 20200005
        },
        {
          label: '分客货交通量',
          value: 20200006
        },
        {
          label: '分车型交通量',
          value: 20200007
        },
        {
          label: '车速',
          value: 20200008
        },
        {
          label: '拥挤度',
          value: 20200009
        },
        {
          label: '适应交通量',
          value: 202000010
        }
      ],
      compareMode: [
        {
          label: '同比',
          value: 202000720001
        },
        {
          label: '环比',
          value: 202000720002
        }
      ],
      line: line,
      pie: pie
    }
  },
  methods: {
    change(e) {
      this.line.series[0].data[0] += 200
      this.$refs.linechart.updateEcharts()
      // debugger
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
