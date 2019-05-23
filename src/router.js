import Vue from 'vue'
import VueRouter from 'vue-router'

//components
import Home from './views/Home.vue'
import Dataviz from './views/Dataviz.vue'
import ChartView from './views/ChartView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/dataviz',
    component: Dataviz
  },
  {
    path: '/chart/:aliment',
    component: ChartView
  }
]

const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
})

export default router