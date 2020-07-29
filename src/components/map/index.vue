<template>
  <div />
</template>

<script>
import { loadModules } from 'esri-loader'
import gaodeLayer1 from './gaodeLayer1.js'

export default {
  name: 'WebMap',
  mounted() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/WebTileLayer', 'esri/layers/support/TileInfo'], {
      css: true })
      .then(
        ([ArcGISMap, MapView, WebTileLayer, TileInfo]) => {
        // 高德瓦片配置 ，注意wkid在4326时位置不对，102100位置才能匹配
        // var gaodeTileInfo = new TileInfo({
        //   dpi: 90.71428571427429,
        //   rows: 256,
        //   cols: 256,
        //   compressionQuality: 0,
        //   origin: {
        //     x: -20037508.342787,
        //     y: 20037508.342787
        //   },
        //   spatialReference: {
        //     wkid: 102100
        //   },
        //   lods: [{ 'level': 0, 'resolution': 156543.033928, 'scale': 591657527.591555 },
        //     { 'level': 1, 'resolution': 78271.5169639999, 'scale': 295828763.795777 },
        //     { 'level': 2, 'resolution': 39135.7584820001, 'scale': 147914381.897889 },
        //     { 'level': 3, 'resolution': 19567.8792409999, 'scale': 73957190.948944 },
        //     { 'level': 4, 'resolution': 9783.93962049996, 'scale': 36978595.474472 },
        //     { 'level': 5, 'resolution': 4891.96981024998, 'scale': 18489297.737236 },
        //     { 'level': 6, 'resolution': 2445.98490512499, 'scale': 9244648.868618 },
        //     { 'level': 7, 'resolution': 1222.99245256249, 'scale': 4622324.434309 },
        //     { 'level': 8, 'resolution': 611.49622628138, 'scale': 2311162.217155 },
        //     { 'level': 9, 'resolution': 305.748113140558, 'scale': 1155581.108577 },
        //     { 'level': 10, 'resolution': 152.874056570411, 'scale': 577790.554289 },
        //     { 'level': 11, 'resolution': 76.4370282850732, 'scale': 288895.277144 },
        //     { 'level': 12, 'resolution': 38.2185141425366, 'scale': 144447.638572 },
        //     { 'level': 13, 'resolution': 19.1092570712683, 'scale': 72223.819286 },
        //     { 'level': 14, 'resolution': 9.55462853563415, 'scale': 36111.909643 },
        //     { 'level': 15, 'resolution': 4.77731426794937, 'scale': 18055.954822 },
        //     { 'level': 16, 'resolution': 2.38865713397468, 'scale': 9027.977411 },
        //     { 'level': 17, 'resolution': 1.19432856685505, 'scale': 4513.988705 },
        //     { 'level': 18, 'resolution': 0.597164283559817, 'scale': 2256.994353 },
        //     { 'level': 19, 'resolution': 0.298582141647617, 'scale': 1128.497176 }
        //   ]
        // })

          // var gaodelayer = WebTileLayer('http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={col}&y={row}&z={level};', {
          //   subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
          //   tileInfo: gaodeTileInfo
          // })

          const map = new ArcGISMap({
            basemap: 'streets'
          // basemap: {
          //   baseLayers: [gaodelayer]
          // }
          })

          this.view = new MapView({
            container: this.$el,
            // spatialReference: {
            //   wkid: 102100
            // },
            map: map,
            center: [121.67, 42.01],
            zoom: 8
          // scale: 20000
          })

          // 加载高德图层
          console.log(gaodeLayer1)
          gaodeLayer1.create(this.view)

          //  const map = new ArcGISMap({
          //   basemap: 'topo-vector'
          // })

        // this.view = new MapView({
        //   container: this.$el,
        //   map: map,
        //   center: [-118, 34],
        //   zoom: 8
        // })
        }
      )
  },
  beforeDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null
    }
  }
}
</script>

<style scoped lang="scss">
div {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
