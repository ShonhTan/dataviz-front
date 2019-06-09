import axiosClient from '../../http'

export default {
  namespaced: true,

  state: {
    country: {
      country_name: '',
      country_code: '',
    },
    food: null,
    comparedCountries: [],
    selectedDecade: 0
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

    setDecade({ commit }, decade) {
      commit('setDecade', decade)
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

    setDecade: (state, decade) => {
      state.selectedDecade = decade
    },

    setFoodData: (state, food) => {
      state.food = food
    },

    addCompareCountry: (state) => {
      state.comparedCountries.push({
        country: {
          country_code: '',
          country_name: ''
        },
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