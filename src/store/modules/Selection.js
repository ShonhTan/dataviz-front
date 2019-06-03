import axiosClient from '../../http'

export default {
  namespaced: true,

  state: {
    country: null,
    food: null,
    selectedYear: 1960
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

    setYear({ commit }, year) {
      commit('setYear', year)
    },
  },

  mutations: {
    setCountry: (state, country) => {
      state.country = country
    },

    setYear: (state, year) => {
      state.selectedYear = year
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