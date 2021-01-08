import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// import modules
import InvoicesList from '@/store/modules/invoices/list'
import CustomerList from '@/store/modules/customer/list'
import CustomerStorage from '@/store/modules/customer/storage'
Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'epro',
    }),
  ],
  namespaced: true,
  modules: {
    InvoicesList,
    CustomerList,
    CustomerStorage,
  },
})

export default store
