<template>
  <div />
</template>

<script>
import { loadModules } from 'esri-loader'
// import esriLoader from 'esri-loader'
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
  },
  beforeDestroy() {
    if (this.view) {
      this.view.container = null// destroy the map view
    }
  },
  methods: {
    async initMap() {
      const [Map, SceneView, Basemap, BaseTileLayer, Color, esriConfig, esriRequest] = await loadModules([
        'esri/Map',
        'esri/views/SceneView',
        'esri/Basemap',
        'esri/layers/BaseTileLayer',
        'esri/Color',
        'esri/config',
        'esri/request'
      ])
      const EchartsLayer = await echartsLayer()
      const TintLayer = BaseTileLayer.createSubclass({
        properties: {
          urlTemplate: null,
          tint: {
            value: null,
            type: Color
          }
        },

        // 为给定的级别、行和列生成平铺url
        getTileUrl: function(level, row, col) {
          return this.urlTemplate
            .replace('{z}', level)
            .replace('{x}', col)
            .replace('{y}', row)
        },

        // 此方法获取指定级别和大小的贴片。
        // 重写此方法以处理从服务器返回的数据。
        fetchTile: function(level, row, col) {
          // 调用getTileUrl()方法来构造磁贴的URL
          // 对于给定的级别，行和col由LayerView提供
          var url = this.getTileUrl(level, row, col)

          // 基于生成的url请求tiles
          // 将allowImageDataAccess设置为true以允许
          // 跨域访问创建3D的WebGL纹理。
          return esriRequest(url, {
            responseType: 'image',
            allowImageDataAccess: true
          }).then(
            function(response) {
              // esri请求成功解析时
              // 从响应中获取图像
              var image = response.data
              var width = this.tileInfo.size[0]
              var height = this.tileInfo.size[0]
              // 创建一个带有2D渲染上下文的画布
              var canvas = document.createElement('canvas')
              var context = canvas.getContext('2d')
              canvas.width = width
              canvas.height = height
              // 在画布上绘制混合图像
              context.drawImage(image, 0, 0, width, height)
              return canvas
            }.bind(this)
          )
        }
      })
      esriConfig.request.corsEnabledServers.push('webrd01.is.autonavi.com')
      esriConfig.request.corsEnabledServers.push('webst01.is.autonavi.com')

      // const digitallTileLayer = new TintLayer({ // 数字图层
      //   urlTemplate: 'http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
      //   tint: new Color('#004FBB'),
      //   title: '高德'
      // })
      const satelliteTileLayer = new TintLayer({ // 卫星图层
        urlTemplate: 'http://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
        tint: new Color('#004FBB'),
        title: '高德'
      })
      const stamenTileLayer = new TintLayer({
        urlTemplate: 'http://webst01.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}',
        tint: new Color('#004FBB'),
        title: '高德'
      })
      const customBasemap = new Basemap({
        baseLayers: [satelliteTileLayer, stamenTileLayer],
        title: 'Custom Basemap',
        id: 'myBasemap'
      })
      const map = new Map({
        basemap: customBasemap
      })
      // map.add(digitallTileLayer)
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
