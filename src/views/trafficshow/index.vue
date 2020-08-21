<template>
  <div class="container">
    <con-form :events="events" @change="query" />
    <div class="container-map">
      <Map :series="seriesData" />
    </div>
  </div>
</template>

<script>
import { getODRegionList, doODRegionRadiation, getODRegionDMList } from '@/api/areamanager/index'
import conForm from './form'
import Map from '@/components/MigrationMap/index2'
import makeData from './serise.js'
import Axios from 'axios'
export default {
  components: { Map, conForm },
  data() {
    return {
      seriesData: null,
      events: null,
      geoCoordMap: []
    }
  },
  created() {
    const that = this
    Axios.all([getODRegionList(), getODRegionDMList()])
      .then(Axios.spread(function(res1, res2) {
        that.events = res1
        const arr = [...res1, ...res2]
        for (let i = 0; i < arr.length; i++) {
          if (!arr[i].regionId) {
            that.geoCoordMap[arr[i].name] = [arr[i].longitude, arr[i].latitude]
          } else {
            that.geoCoordMap[arr[i].regionName] = [arr[i].longitude, arr[i].latitude]
          }
        }
      }))
  },
  methods: {
    query(e) {
      const params = {
        granularity: e.granularity,
        direction: e.direction
      }
      let data = null
      for (let i = 0; i < this.events.length; i++) {
        if (this.events[i].regionId === e.odRegion) {
          data = this.events[i]
        }
      }
      if (e.time.length > 0) {
        params.begintime = e.time[0]
        params.endtime = e.time[1]
      }
      // debugger
      doODRegionRadiation(params, data).then(res => {
        debugger
        this.seriesData = makeData([data.regionName, res], this.geoCoordMap)
      })
    }
  }
}
</script>

<style lang='scss' scoped>
  .container{
    margin: 30px;
    &-map{
      height: 760px;
    }
  }
</style>
