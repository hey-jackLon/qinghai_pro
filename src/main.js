import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import echarts from 'echarts'

import { loadScript } from 'esri-loader'
import { loadCss } from 'esri-loader'
// preload the ArcGIS API
loadScript({
  url: 'http://localhost:8080/arcgis_js_v416_api/arcgis_js_api/library/4.16/dojo/dojo.js'
})
loadCss('http://localhost:8080/arcgis_js_v416_api/arcgis_js_api/library/4.16/esri/themes/light/main.css')
// http://localhost:8080/arcgis_js_v410_api/arcgis_js_api/library/4.10/esri/themes/light/main.css
// http://localhost:8080/arcgis_js_v410_api/arcgis_js_api/library/4.10/dojo/dojo.js
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
