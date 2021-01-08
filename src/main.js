// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/css/defaultTheme.css'
import '@/assets/css/responsive.css'

import 'jquery-ui/themes/base/all.css'
import 'devextreme/dist/css/dx.common.css'
import 'devextreme/dist/css/dx.light.css'
import '@devexpress/analytics-core/dist/css/dx-analytics.common.css'
import '@devexpress/analytics-core/dist/css/dx-analytics.light.css'
import '@devexpress/analytics-core/dist/css/dx-querybuilder.css'
import 'devexpress-reporting/dist/css/dx-webdocumentviewer.css'
import 'devexpress-reporting/dist/css/dx-reportdesigner.css'
// Vuex
import Vuex from 'vuex'
import store from './store/store'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

/* eslint-disable no-new */
// Vue.filter('currency', function (value) {
//   return '' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
// })

Vue.mixin({
  methods: {
    FormatCurrency(value) {
      return (
        '' +
        parseFloat(value)
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
      )
    },
    FormatDate(date) {
      return new Date(date).toString() !== 'Invalid Date'
        ? new Date(date).toLocaleDateString('en-GB')
        : undefined
    },
    FormatDateTime(date) {
      return new Date(date).toString() !== 'Invalid Date'
        ? new Date(date).toLocaleDateString('en-GB') +
            '  ' +
            new Date(date).toLocaleTimeString('th-TH')
        : undefined
    },
    FormatTime(date) {
      return new Date(date).toString() !== 'Invalid Date'
        ? new Date(date).toLocaleTimeString('th-TH')
        : undefined
    },
    ISOString(date) {
      return new Date(date).toString() !== 'Invalid Date'
        ? new Date(date).toISOString('en-GB')
        : undefined
    },
    $_validateForm: function (form, validate, submitForm) {
      var isError = false
      if (validate) {
        Object.getOwnPropertyNames(this[validate]).forEach((element) => {
          if (
            (form ? this.$data[form][element] : this.$data[element]) === '' ||
            (form ? this.$data[form][element] : this.$data[element]) ===
              undefined
          ) {
            this.$data[validate][element] = true
            isError = true
          } else {
            this.$data[validate][element] = false
          }
        })
      }
      if (!isError) {
        this[submitForm](this.$data[form])
      } else {
      }
    },
    $_clearForm(form, reload) {
      Object.getOwnPropertyNames(this[form]).forEach((element) => {
        if (element !== '__ob__') this[form][element] = ''
      })

      this[reload] = false
      this.$nextTick(() => {
        this[reload] = true
      })
    },
    $_reloadForm(reload) {
      // Object.getOwnPropertyNames(this[form]).forEach((element) => {
      //   if (element !== '__ob__') this[form][element] = ''
      // })

      this[reload] = false
      this.$nextTick(() => {
        this[reload] = true
      })
    },
  },
})

export const eventBus = new Vue()

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
