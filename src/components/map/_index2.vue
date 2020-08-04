<template>
  <div />
</template>

<script>
import { loadModules } from 'esri-loader'
// import GaoDeLayer from './GaoDeLayer'

export default {
  name: 'WebMap',
  mounted() {
    this.initMap()
  },
  beforeDestroy() {
    if (this.view) {
      // 销毁地图视图
      this.view.container = null
    }
  },
  methods: {
    initMap() {
      loadModules(
        [
          'esri/Map',
          'esri/Basemap',
          'esri/config',
          'esri/views/MapView',
          'esri/views/SceneView',
          'esri/geometry/Extent',
          'esri/geometry/SpatialReference',
          'esri/layers/TileLayer',
          'esri/layers/WebTileLayer',
          'esri/layers/support/TileInfo',
          'esri/Ground',
          'dojo/on',
          'esri/geometry/Point'
        ]
      ).then(([
        Map,
        Basemap,
        esriConfig,
        MapView,
        SceneView,
        Extent,
        SpatialReference,
        TileLayer,
        WebTileLayer,
        TileInfo,
        Ground,
        on,
        Point
      ]) => {
      // 实例化坐标系
        const spatialReference = new SpatialReference({ wkid: 3857 })
        // 实例化初始范围
        // let extent = new Extent({xmax: 13371824.0074, xmin: 8175464.5009, ymax: 5180434.2587, ymin: 3109500.2107,spatialReference});
        // const extent = new Extent(-20037508.342787, -20037508.342787, 20037508.342787, 20037508.342787, new SpatialReference({ wkid: 3857 }))
        const tileInfo = new TileInfo({
          'cols': 256,
          'rows': 256,
          'compressionQuality': 0,
          'origin': new Point(-20037508.342787, 20037508.342787, new SpatialReference({ wkid: 3857 })),
          // 'origin': { x: -20037508.342787, y: 20037508.342787 },
          'spatialReference': { wkid: 3857 },
          'lods': [
            { 'level': 0, 'resolution': 156543.033928, 'scale': 591657527.591555 },
            { 'level': 1, 'resolution': 78271.5169639999, 'scale': 295828763.795777 },
            { 'level': 2, 'resolution': 39135.7584820001, 'scale': 147914381.897889 },
            { 'level': 3, 'resolution': 19567.8792409999, 'scale': 73957190.948944 },
            { 'level': 4, 'resolution': 9783.93962049996, 'scale': 36978595.474472 },
            { 'level': 5, 'resolution': 4891.96981024998, 'scale': 18489297.737236 },
            { 'level': 6, 'resolution': 2445.98490512499, 'scale': 9244648.868618 },
            { 'level': 7, 'resolution': 1222.99245256249, 'scale': 4622324.434309 },
            { 'level': 8, 'resolution': 611.49622628138, 'scale': 2311162.217155 },
            { 'level': 9, 'resolution': 305.748113140558, 'scale': 1155581.108577 },
            { 'level': 10, 'resolution': 152.874056570411, 'scale': 577790.554289 },
            { 'level': 11, 'resolution': 76.4370282850732, 'scale': 288895.277144 },
            { 'level': 12, 'resolution': 38.2185141425366, 'scale': 144447.638572 },
            { 'level': 13, 'resolution': 19.1092570712683, 'scale': 72223.819286 },
            { 'level': 14, 'resolution': 9.55462853563415, 'scale': 36111.909643 },
            { 'level': 15, 'resolution': 4.77731426794937, 'scale': 18055.954822 },
            { 'level': 16, 'resolution': 2.38865713397468, 'scale': 9027.977411 },
            { 'level': 17, 'resolution': 1.19432856685505, 'scale': 4513.988705 },
            { 'level': 18, 'resolution': 0.597164283559817, 'scale': 2256.994353 }
          ]
        })
        const digitalLayer = new WebTileLayer({
          id: 'digitalMap',
          title: 'digitalMap',
          urlTemplate: 'http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={col}&y={row}&z={level}',
          tileInfo: tileInfo,
          spatialReference: spatialReference
        })
        const mapControl = new Map({
        // spatialReference:spatialReference,
          basemap: {
            baseLayers: [digitalLayer]
          }
        })
        // 实例化MapView对象
        this.view = new MapView({
          map: mapControl,
          container: this.$el,
          center: [116.41, 39.90],
          // extent: extent,
          zoom: 10
        })
      })
    }
  }
}

</script>

<style scoped>
div {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
