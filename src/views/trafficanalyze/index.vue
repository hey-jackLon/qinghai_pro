<template>
  <div class="container">
    <con-form :events="events" @change="change" />
    <div class="container-main">
      <div class="container-main-left">
        <el-table
          :data="tableData"
          style="width: 100%"
          height="100%"
          border
        >
          <el-table-column
            label="排名"
            width="50"
            type="index"
          />
          <el-table-column
            prop="name"
            label="行政区"
            width="180"
          />
          <el-table-column
            prop="kc"
            label="客车"
          />
          <el-table-column
            prop="hc"
            label="货车"
          />
          <el-table-column
            prop="zyc"
            label="作业车"
          />
        </el-table>
      </div>
      <div class="container-main-right">
        <div class="container-main-right-top">
          <con-table :table-data="tableData" />
        </div>
        <div class="container-main-right-bottom">
          <div class="container-main-right-bottom-left">
            <bar-chart id="bar" :table-data="tableData" width="100%" height="100%" />
          </div>
          <div class="container-main-right-bottom-right">
            <pie-chart id="pie" :table-data="tableData" width="100%" height="100%" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getODRegionList, doODRegionIndexAnalysis } from '@/api/areamanager/index'
import conForm from './form.vue'
import conTable from './table.vue'
import pieChart from '@/components/chart/pie.vue'
import barChart from '@/components/chart/bar.vue'
export default {
  name: 'Dashboard',
  components: {
    conForm,
    conTable,
    pieChart,
    barChart
  },
  data() {
    return {
      events: [],
      tableData: []
    }
  },
  created() {
    getODRegionList().then(res => {
      this.events = res
    })
  },
  methods: {
    change(e) {
      this.doODRegionIndexAnalysis(e)
    },
    doODRegionIndexAnalysis(val) {
      const params = {
        granularity: val.granularity,
        direction: val.direction
      }
      let data = null
      for (let i = 0; i < this.events.length; i++) {
        if (this.events[i].regionId === val.odRegion) {
          data = this.events[i]
        }
      }
      if (val.time.length > 0) {
        params.begintime = val.time[0]
        params.endtime = val.time[1]
      }

      if (val.compare_mode.length > 0) {
        if (val.compare_mode.indexOf('环比') !== -1) {
          params.hb = true
        } else {
          params.hb = false
        }
        if (val.compare_mode.indexOf('同比') !== -1) {
          params.tb = true
        } else {
          params.tb = false
        }
      }
      doODRegionIndexAnalysis(params, data).then(res => {
        this.tableData = res
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 30px;
  &-main {
    height: 750px;
    width: 100%;
    // background: pink;
    display: flex;
    &-left {
      width: 30%;
      height: 100%;
      background: rgb(152, 236, 152);
    }
    &-right {
      width: 70%;
      height: 100%;
      &-top{
        height: 50%;
      }
      &-bottom{
        height: 50%;
        display: flex;
        &-left{
          height: 100%;
          width: 50%;
        }
        &-right{
          height: 100%;
          width: 50%;
        }
      }
    }
  }
}
</style>
