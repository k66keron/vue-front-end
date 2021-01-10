const CustomerStorage = {
  namespaced: true,
  state: {
    customers: [],
    errors: false,
  },
  mutations: {
    SET_CUSTOMER_DATA: (state, { payload, getters }) => {
      const index = state.customers.findIndex(
        (element) => element.email === payload.email
      )
      if (index < 0) {
        state.customers.unshift(payload)
        state.errors = false
      } else {
        state.errors = true
      }
    },
    SET_CLEAR_DATA: (state) => {
      state.customers = []
    },
    SET_CUSTOMER_EDIT_DATA: (state, payload) => {
      const index = state.customers.findIndex(
        (element) => element.cid === payload.cid
      )
      state.customers[index].name = payload.edit.name
      state.customers[index].surname = payload.edit.surname
      state.customers[index].phone = payload.edit.phone
      state.customers[index].phoneExt = payload.edit.phoneExt
      state.customers[index].address = payload.edit.address
      state.customers[index].status = payload.edit.status
    },
    SET_CUSTOMER_REMOVE_DATA: (state, payload) => {
      const index = state.customers.findIndex(
        (element) =>
          element.cid === payload.cid && element.email === payload.email
      )
      state.customers.splice(index, 1)
    },
  },
  getters: {
    GET_CUSTOMER_DATA: (state) => {
      return state.customers
    },
    GET_CUSTOMER_ERROR: (state) => {
      return state.errors
    },
    GET_CUSTOMER: (state) => (cid) => {
      return state.customers.find((element) => element.cid === cid)
    },
  },
  actions: {
    ADD_CUSTOMER_DATA: ({ commit, getters }, payload) => {
      return new Promise((resolve) => {
        commit('SET_CUSTOMER_DATA', { payload, getters })
        resolve()
      })
    },
    EDIT_CUSTOMER_DATA: ({ commit }, payload) => {
      return new Promise((resolve) => {
        commit('SET_CUSTOMER_EDIT_DATA', payload)
        resolve()
      })
    },
    REMOVE_CUSTOMER_DATA: ({ commit }, payload) => {
      return new Promise((resolve) => {
        commit('SET_CUSTOMER_REMOVE_DATA', payload)
        resolve()
      })
    },
    CLEAR_CUSTOMER_DATA: ({ commit, getters }, payload) => {
      commit('SET_CLEAR_DATA', payload)
    },
  },
}

export default CustomerStorage
