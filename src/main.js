import Vue from 'vue'
import App from './App.vue'

//import style
import './assets/stylesheets/main.scss'

//import svg
const r = require.context('./assets/svg', false, /\.svg$/)
r.keys().map(r)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
