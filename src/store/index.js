import Vue from 'vue'
import Vuex from 'vuex'

import Params from './modules/Params.js'
import Selection from './modules/Selection.js'

Vue.use(Vuex)

const store = new Vuex.Store(
  {
    modules: {
      Params,
      Selection,
    }
  }
)

export default store
