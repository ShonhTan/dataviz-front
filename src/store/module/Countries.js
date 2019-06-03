import axiosClient from '../../http'

export default {
  namespaced: true,

  state: {
    country: null,
  },

  actions: {
    setCountry({ commit }, country) {
      commit('setCountry', country)
      axiosClient.get('/food', {
        params: { country_code: country.country_code }
      }).then(res => {
        commit('setFoodData', res.data)
      })
    },

  },

  mutations: {
    setCountry: (state, country) => {
      state.country = country
    },

    setFoodData: (state, food) => {
      state.food = food
    }
  },

  getters: {
    State (state) {
      return state
    }
  }
}