import Vue from 'vue'

const CustomerStorage = {
  namespaced: true,
  state: {
    customers: [],
  },
  mutations: {
    SET_CUSTOMER_DATA: (state, { payload, getters }) => {
      console.log(payload)
      state.customers.unshift(payload)
    },
    SET_CLEAR_DATA: (state) => {
      state.customers = []
    },
  },
  getters: {
    GET_CUSTOMER_DATA: (state, getters) => {
      console.log(state.customers)
      return state.customers
    },
    GET_CUSTOMER: (state) => (cid) => {
      return state.customers.find((element) => element.cid === cid)
    },
    // GET_DATA: (state, cid) => {
    //   console.log(cid)
    //   return cid
    // },
  },
  actions: {
    ADD_CUSTOMER_DATA: ({ commit, getters }, payload) => {
      return new Promise((resolve) => {
        commit('SET_CUSTOMER_DATA', { payload, getters })
        resolve()
      })
    },
    CLEAR_CUSTOMER_DATA: ({ commit, getters }, payload) => {
      commit('SET_CLEAR_DATA', payload)
    },
  },
}

export default CustomerStorage
