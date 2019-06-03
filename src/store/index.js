import Vue from 'vue'
import Vuex from 'vuex'

import Country from './modules/Country.js'

Vue.use(Vuex)

const store = new Vuex.Store(
  {
    modules: {
      Country,
    }
  })

export default store
