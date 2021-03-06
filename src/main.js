import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store'
import './helpers/filters.js'

//import style
import './assets/stylesheets/main.scss'

import './helpers/directives.js'

//import svg for svg-sprite-loader
const r = require.context('./assets/svg', false, /\.svg$/)
r.keys().map(r)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
