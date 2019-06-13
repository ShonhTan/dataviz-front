import axiosClient from '../../http'

const alimentList = ['fruit', 'vegetable', 'meat', 'fish', 'sugar', 'cereals', 'coffee', 'milk']

export default {
  namespaced: true,

  state: {
    country: {
      country_name: '',
      country_code: '',
    },
    food: null,
    world: {
      state: false,
      food: []
    },
    comparedCountries: [],
    selectedDecade: 0
  },

  actions: {
    setCountry({ commit }, country) {
      if (country.country_code === '000') {
        commit('setCountry', country)
        axiosClient.get('/food', {
          params: { world: true }
        }).then(res => {
          commit('setFoodData', {
            name: 'World',
            data: res.data
          })
        })
      } else {
        commit('setCountry', country)
        axiosClient.get('/food', {
          params: { country_code: country.country_code }
        }).then(res => {
          commit('setFoodData', res.data)
        })
      }
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
      if (country.country_code === '000') {
        commit('setCompareCountry', { country, index })
        axiosClient.get('/food', {
          params: { world: true }
        }).then(res => {
          commit('setCompareFoodData', {
            data: {
              name: 'World',
              data: res.data
            },
            index
          })
        })
      } else {
        commit('setCompareCountry', { country, index })
        axiosClient.get('/food', {
          params: { country_code: country.country_code }
        }).then(res => {
          commit('setCompareFoodData', { data: res.data, index})
        })
      }
    }
  },

  mutations: {
    setCountry: (state, country) => {
      state.country = country
    },

    setDecade: (state, decade) => {
      state.selectedDecade = decade
    },

    setFoodData: (state, country) => {
      state.food = {
        name: country.name,
        data: alimentList.map(aliment => country.data.find(el => el.short_name===aliment) || {
          short_name: aliment,
          aliment_name: aliment.split('_').map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(' '),
          data: [...Array(53).keys()].map(el => ({year:el+1960, quantity:0 }))
        })
      }
    },

    getWorldData: (state, food) => {
      state.world.food = alimentList.map(aliment => food.find(el => el.short_name===aliment))
    },

    setWorldState: (state, bool) => {
      state.world.state = bool
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
    },
    zaWarudo: (state) => {
      return [
        state.food,
        {
          name: 'World',
          data: state.world.food
        }
      ]
    }
  }
}