<template>
  <div />
</template>

<script>
// import { loadModules } from 'esri-loader'
import esriLoader from 'esri-loader'
import GaoDeLayer from './GaoDeLayer'

export default {
  name: 'WebMap',
  mounted() {
    this.loadArcgis()
  },
  beforeDestroy() {
  },
  methods: {
    loadArcgis() {
      esriLoader.loadCss('https://js.arcgis.com/3.33/esri/css/esri.css') // 该方法用于加载 arcgis 依赖的js,css 等
      return esriLoader.loadScript({ // 加载js
        url: 'https://js.arcgis.com/3.33/dojo/dojo.js',
        dojoConfig: {
          async: true
        }
      }).then(// dojo加载完成之后，载入高德地图类
        () => this.initMap()
      ).catch(
        err => console.log(err)
      )
    },

    initMap() {
      return GaoDeLayer().then(// 高德地图类加载完成后和其他地图初始化相关模块一块传入
        (gdlayer) => {
          esriLoader.loadModules([
            'esri/map',
            'esri/geometry/Point'
          ]).then(
            (params) => this._initMap([gdlayer, ...params])
          )
        }
      )
    },

    _initMap([GaoDeMapLayer, Map, Point]) { // 初始化地图,并设置中心点等
      const map = new Map(this.$el, {
        logo: false,
        basemap: 'topo'
      }) // 创建地图实例
      const pt = new Point(105, 29) // 设置中心点
      map.centerAndZoom(pt, 11) // 设置中心点和缩放级别;
      map.addLayer(new GaoDeMapLayer()) // 将图层添加到map对象
      return map
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
