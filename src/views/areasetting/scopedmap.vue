<template>
  <div />
</template>

<script>
import { loadModules } from 'esri-loader'
export default {
  name: 'WebMap',

  data() {
    return {
      map: null,
      view: null,
      stationLayer: null,
      Graphic: null,
      scopedObject: null
    }
  },
  mounted() {
    this.initMap()
  },
  beforeDestroy() {
    if (this.view) {
      this.view.container = null// 销毁地图
    }
  },
  methods: {
    async initMap() {
      const [Map, MapView, GraphicsLayer, Sketch, TileLayer] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/layers/GraphicsLayer',
        'esri/widgets/Sketch',
        'esri/layers/TileLayer',
        'dojo/domReady!'])
      const layer = new TileLayer({ url: 'http://63.1.20.191:6080/arcgis/rest/services/qh/china_white_0610/MapServer' })

      this.stationLayer = new GraphicsLayer()
      this.map = new Map({
        layers: [layer]
      })

      this.view = new MapView({
        container: this.$el,
        map: this.map,
        center: [101.778112, 36.617042],
        zoom: 9
      })

      // Sketch widget
      this.map.add(this.stationLayer)
      this.sketch = new Sketch({
        view: this.view,
        layer: this.stationLayer,
        availableCreateTools: ['polygon', 'rectangle', 'circle'],
        creationMode: 'single'
      })

      // Add widget to the view
      this.view.ui.add(this.sketch, 'top-right')
      this.sketch.on('create', function(event) {
        if (event.state === 'complete') {
          // debugger
          if (!this.scopedObject) {
            this.scopedObject = event.graphic
            this.$emit('getScopedInfo', event.graphic)
          } else {
            this.stationLayer.remove(this.scopedObject)
            this.scopedObject = event.graphic
            this.$emit('getScopedInfo', event.graphic)
          }
        }
      }.bind(this))

      // const graphic = new Graphic({
      //   geometry: {
      //     type: 'polygon',
      //     spatialReference: { 'latestWkid': 3857, 'wkid': 102100 },
      //     rings: [
      //       [11308485.233820729, 4404067.307810066],
      //       [11324078.387590902, 4404067.307810066],
      //       [11324078.387590902, 4392143.131397581],
      //       [11308485.233820729, 4392143.131397581],
      //       [11308485.233820729, 4404067.307810066]
      //     ]
      //   },
      //   symbol: {
      //     type: 'simple-fill', // autocasts as new SimpleFillSymbol()
      //     color: [227, 139, 79, 0.8],
      //     outline: {
      //       // autocasts as new SimpleLineSymbol()
      //       color: [255, 255, 255],
      //       width: 1
      //     }
      //   }
      // })
      // this.stationLayer.add(graphic)
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
