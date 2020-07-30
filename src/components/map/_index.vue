<template>
  <div />
</template>

<script>
import esriLoader from 'esri-loader'
// import GaoDeLayer from './GaoDeLayer'

export default {
  name: 'WebMap',
  mounted() {
    esriLoader
      .loadModules(
        [
          'esri/Map',
          'esri/config',
          'esri/request',
          'esri/Color',
          'esri/views/SceneView',
          'esri/layers/BaseTileLayer',
          'esri/views/MapView',
          'dojo/domReady!'
        ],
        'https://js.arcgis.com/4.7/'
      ).then(([
        Map,
        esriConfig,
        esriRequest,
        Color,
        SceneView,
        BaseTileLayer,
        MapView
      ]) => {
        const TintLayer = BaseTileLayer.createSubclass({
          properties: {
            urlTemplate: null,
            tint: {
              value: null,
              type: Color
            }
          },

          // generate the tile url for a given level, row and column
          getTileUrl: function(level, row, col) {
            return this.urlTemplate
              .replace('{z}', level)
              .replace('{x}', col)
              .replace('{y}', row)
          },

          // This method fetches tiles for the specified level and size.
          // Override this method to process the data returned from the server.
          fetchTile: function(level, row, col) {
            // call getTileUrl() method to construct the URL to tiles
            // for a given level, row and col provided by the LayerView
            var url = this.getTileUrl(level, row, col)

            // request for tiles based on the generated url
            // set allowImageDataAccess to true to allow
            // cross-domain access to create WebGL textures for 3D.
            return esriRequest(url, {
              responseType: 'image',
              allowImageDataAccess: true
            }).then(
              function(response) {
                // when esri request resolves successfully
                // get the image from the response
                var image = response.data
                var width = this.tileInfo.size[0]
                var height = this.tileInfo.size[0]

                // create a canvas with 2D rendering context
                var canvas = document.createElement('canvas')
                var context = canvas.getContext('2d')
                canvas.width = width
                canvas.height = height

                // Draw the blended image onto the canvas.
                context.drawImage(image, 0, 0, width, height)

                return canvas
              }.bind(this)
            )
          }
        })
        esriConfig.request.corsEnabledServers.push('webst01.is.autonavi.com')

        // Create a new instance of the TintLayer and set its properties
        const digitallTileLayer = new TintLayer({
          urlTemplate: 'http://webst01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
          tint: new Color('#004FBB'),
          title: '高德'
        })
        const satelliteTileLayer = new TintLayer({
          urlTemplate: 'http://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
          tint: new Color('#004FBB'),
          title: '高德'
        })
        const stamenTileLayer = new TintLayer({
          urlTemplate: 'http://webst01.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}',
          tint: new Color('#004FBB'),
          title: '高德'
        })
        const map = new Map({
          layers: [satelliteTileLayer]
        })

        // const view2D = new MapView({
        //   container: this.$el,
        //   map: map,
        //   center: [110.1, 23.8],
        //   zoom: 3
        // })
        this.view3D = new SceneView({
          container: this.$el,
          map: map,
          center: [110.1, 23.8],
          zoom: 1,
          ui: false
        })
      })
  },
  beforeDestroy() {
    if (this.view3D) {
      // destroy the map view
      this.view3D.container = null
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
