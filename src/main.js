import Vue from 'vue'
import App from './App.vue'
import router from './router.js'

//import style
import './assets/stylesheets/main.scss'

import './helpers/directives.js'

//import svg
const r = require.context('./assets/svg', false, /\.svg$/)
r.keys().map(r)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
