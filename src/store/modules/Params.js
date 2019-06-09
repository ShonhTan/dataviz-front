import axiosClient from '../../http'

export default {
  namespaced: true,

  state: {
    countryList: [],
    yearList: []
  },

  actions: {
    getParams({ commit }) {
      axiosClient.get('/countries')
      .then(res => {
        commit('setCountryList', res.data)
      })

      axiosClient.get('/years')
        .then(res => {
          commit('setYearList', res.data)
        })
      
    },
  },

  mutations: {
    setCountryList: (state, countryList) => {
      state.countryList = countryList
    },

    setYearList: (state, yearList) => {
      state.yearList = yearList
    }
  },

  getters: {
    decades (state) {
      const decades = []
      for(let i=0; i< state.yearList.length; i++) {
        if (!decades.length || state.yearList[i].year - decades[decades.length - 1][0] >= 10) {
          decades.push([])
        }
        decades[decades.length - 1].push(state.yearList[i].year)
      }
      return decades
    }
  }
}