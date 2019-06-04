import axiosClient from '../../http'

export default {
  namespaced: true,

  state: {
    country: null,
    food: null,
    comparedCountries: [],
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

    addCompareCountry({ commit }) {
      commit('addCompareCountry')
    },

    removeCompareCountry({ commit }, index) {
      commit('removeCompareCountry', index)
    },

    setCompareCountry({ commit }, { country, index }) {
      commit('setCompareCountry', { country, index })
      axiosClient.get('/food', {
        params: { country_code: country.country_code }
      }).then(res => {
        commit('setCompareFoodData', { data: res.data, index})
      })
    }
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
    },

    addCompareCountry: (state) => {
      state.comparedCountries.push({
        country: null,
        food: null
      })
    },

    removeCompareCountry: (state, index) => {
      state.comparedCountries.splice(index, 1)
    },

    setCompareCountry: (state, { country, index }) => {
      state.comparedCountries[index].country = country
    },

    setCompareFoodData: (state, { data, index }) => {
      state.comparedCountries[index].food = data
      console.log(state)
    }
  },
  
  getters: {
    allCountriesFoodData: (state) => {
      return [
        state.food,
        ...state.comparedCountries.map(el => el.food)
      ]
    }
  }
}