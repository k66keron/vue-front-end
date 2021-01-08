// import {
//   ToISOString
// } from '@/utils/format-date.js'
// import enum
// import { RTEnum } from '@/enum/goods-return.enum.js'
const InvoicesList = {
  namespaced: true,
  state: {
    filterBasic: {
      invoiceNo: '',
      customerId: '',
      status: ['Complete'],
      isStatus: {
        // all: false,
        Pending: false,
        Complete: true,
        Delete: false,
      },
    },
    filterAdvanced: {
      invoiceNo: '',
      customerId: '',
      dateBegin: new Date(
        new Date().setDate(new Date().getDate() - 7)
      ).toISOString('en-GB'),
      dateUntil: new Date().toISOString('en-GB'),
      status: [],
      isStatus: {
        // all: false,
        Pending: false,
        Complete: false,
        Delete: false,
      },
    },
  },
  mutations: {
    SET_DEFAULT_BASIC: (state, data) => {
      state.filterBasic = data
    },
    CLEAR_DEFAULT_BASIC: (state) => {
      state.filterBasic = {
        invoiceNo: '',
        customerId: '',
        status: ['Complete'],
        isStatus: {
          // all: false,
          Pending: false,
          Complete: true,
          Delete: false,
        },
      }
    },
    SET_DEFAULT_ADVANCED: (state, data) => {
      state.filterAdvanced = data
    },
    CLEAR_DEFAULT_ADVANCED: (state) => {
      state.filterAdvanced = {
        invoiceNo: '',
        customerId: '',
        dateBegin: new Date(
          new Date().setDate(new Date().getDate() - 7)
        ).toISOString('en-GB'),
        dateUntil: new Date().toISOString('en-GB'),
        status: [],
        isStatus: {
          // all: false,
          Pending: false,
          Complete: false,
          Delete: false,
        },
      }
    },
  },
  getters: {
    GET_DEFAULT_BASIC: (state) => {
      return state.filterBasic
    },
    GET_DEFAULT_ADVANCED: (state) => {
      return state.filterAdvanced
    },
  },
  actions: {
    ADD_DEFAULT_BASIC: ({ commit }, data) => {
      commit('SET_DEFAULT_BASIC', data)
    },
    CLEAR_DEFAULT_BASIC: ({ commit }) => {
      commit('CLEAR_DEFAULT_BASIC')
    },
    ADD_DEFAULT_ADVANCED: ({ commit }, data) => {
      commit('SET_DEFAULT_ADVANCED', data)
    },
    CLEAR_DEFAULT_ADVANCED: ({ commit }) => {
      commit('CLEAR_DEFAULT_ADVANCED')
    },
  },
}

export default InvoicesList
