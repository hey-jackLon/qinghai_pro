<template>
  <div />
</template>

<script>
// import { loadModules } from 'esri-loader'
import esriLoader from 'esri-loader'
import echartsLayer from './echartsLayer'

export default {
  name: 'WebMap',
  props: {
    series: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  mounted() {
    this.initMap()
    // this.loadArcgis()
  },
  beforeDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null
    }
  },
  methods: {
    initMap() {
      return echartsLayer().then(// 高德地图类加载完成后和其他地图初始化相关模块一块传入
        (echartsLayer) => {
          esriLoader.loadModules([
            'esri/Map',
            'esri/Basemap',
            'esri/layers/TileLayer',
            'esri/views/SceneView',
            'esri/views/MapView'
          ]).then(
            (params) => this._initMap([echartsLayer, ...params])
          )
        }
      )
    },

    _initMap([EchartsLayer, Map, Basemap, TileLayer, SceneView, MapView]) { // 初始化地图,并设置中心点等
      var layer = new TileLayer({
        url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer'
      })
      var customBasemap = new Basemap({
        baseLayers: [layer],
        title: 'Custom Basemap',
        id: 'myBasemap'
      })
      var map = new Map({
        basemap: customBasemap
      })

      this.view = new SceneView({
        center: [110.62, 36.32], // long, lat
        container: this.$el,
        map: map,
        zoom: 4
      })
      this.view.on('layerview-create', function() {
        var chart = new EchartsLayer(this.view, this.$echarts)
        var option = {
          series: this.series
        }
        chart.setChartOption(option)
      }.bind(this))
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
