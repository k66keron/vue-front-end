export const state = () => ({
  customers: [],
})

export const mutations = {
  ADD_CUSTOMER_DATA(state, payload) {
    state.customers.push(payload)
  },
}

export const actions = {
  ADD_CUSTOMER_DATA({ commit }, payload) {
    commit('ADD_CUSTOMER_DATA', payload)
  },
}

export const getters = {
  GET_CUSTOMER_DATA: (state) => state.customers,
}
