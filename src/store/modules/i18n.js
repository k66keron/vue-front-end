const language = {
  namespaced: true,
  state: {
    localLang: 'EN',
  },
  mutations: {
    SET_I18N: (state, { payload }) => {
      state.localLang = payload
    },
  },
  getters: {
    GET_I18N: (state) => {
      return state.localLang
    },
  },
  actions: {
    ADD_I18N: ({ commit }, payload) => {
      return new Promise((resolve) => {
        commit('SET_I18N', { payload })
        resolve()
      })
    },
  },
}

export default language
