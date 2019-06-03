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
        if(state.yearList.find(el => el.year === state.yearList[i].year+9)) {
          decades.push({
            min: state.yearList[i].year,
            max: state.yearList[i].year+9
          })
          i+=9
        }
      }
      return decades
    }
  }
}