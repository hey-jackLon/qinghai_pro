<template>
  <div />
</template>

<script>
import { loadModules } from 'esri-loader'
// import GaoDeLayer from './GaoDeLayer'

export default {
  name: 'WebMap',
  props: {
    stationData: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      map: null,
      view: null,
      stationLayer: null,
      Graphic: null
    }
  },
  watch: {
    stationData: {
      handler(n, o) {
        this.initMarkers()
      },
      deep: true
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
      const [Map, MapView, GraphicsLayer, Graphic, TileLayer] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/layers/GraphicsLayer',
        'esri/Graphic',
        'esri/layers/TileLayer',
        'dojo/domReady!'])
      const layer = new TileLayer({ url: 'http://63.1.20.191:6080/arcgis/rest/services/qh/china_white_0610/MapServer' })
      this.map = new Map({
        layers: [layer]
      })
      this.view = new MapView({
        container: this.$el,
        map: this.map,
        center: [101.778112, 36.617042],
        zoom: 9
      })

      this.stationLayer = new GraphicsLayer()
      this.Graphic = Graphic
      this.map.add(this.stationLayer)
      this.initMarkers()

      this.graphicLayerClick(this, this.view, this.stationLayer)
    },
    initMarkers() {
      if (this.stationLayer) {
        const data = this.stationData
        if (data.length === 0) return
        this.stationLayer.removeAll()
        var graphics = []
        var simpleMarkerSymbol = {
          type: 'picture-marker',
          url: require('@/assets/map/img/camera2.png'),
          width: '30px',
          height: '30px'
        }
        for (var i = 0; i < data.length; i++) {
          graphics.push(new this.Graphic({
            geometry: {
              type: 'point',
              latitude: data[i].latitude,
              longitude: data[i].longitude
            },
            symbol: simpleMarkerSymbol,
            attributes: data[i]
          }))
        }

        this.stationLayer.addMany(graphics)
      } else {
        return
      }
    },
    graphicLayerClick(that, view, layer) {
      view.on(['click'], function(event) {
        view.hitTest(event).then(function(response) {
          if (response.results.length) {
            var graphic = response.results.filter(function(result) {
              return result.graphic.layer === layer
            })[0].graphic
            if (graphic) {
              that.$emit('getStationInfo', graphic.attributes)
            }
          }
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
