<template>
  <div class="container-fluid mt-4">
    <breadcrumb :items="breadcrumbItems" />
    <div class="card filter-tabs">
      <invoices-filter
        :dataBasic="filterBasic"
        :dataAdvanced="filterAdvanced"
        @searchBasic="searchBasic($event)"
        @searchAdvanced="searchAdvanced($event)"
      ></invoices-filter>
      <invoices-result :data="resultList"></invoices-result>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
// import { eventBus } from '@/main.js'
import axios from 'axios'
import BreadCrumb from '@/components/templates/bread-crumb.vue'
import InvoicesFilter from '@/components/invoices/invoices-filter.vue'
import InvoicesResult from '@/components/invoices/invoices-result.vue'

export default {
  name: 'Invoice',
  components: {
    breadcrumb: BreadCrumb,
    'invoices-filter': InvoicesFilter,
    'invoices-result': InvoicesResult
  },
  data() {
    return {
      breadcrumbItems: [
        {
          text: 'Invoices',
          href: '#'
        },
        {
          text: 'Invoices List'
        }
      ],
      filterBasic: {},
      filterAdvanced: {},
      resultList: {
        items: []
      }
    }
  },
  watch: {
    GET_DEFAULT_BASIC(val, oldVal) {
      this.filterBasic = Object.assign({}, val)
    },
    GET_DEFAULT_ADVANCED(val, oldVal) {
      this.filterAdvanced = Object.assign({}, val)
    }
  },
  computed: {
    ...mapGetters('InvoicesList', ['GET_DEFAULT_BASIC', 'GET_DEFAULT_ADVANCED'])
  },
  mounted() {
    this.filterBasic = Object.assign({}, this.GET_DEFAULT_BASIC)
    this.filterAdvanced = Object.assign({}, this.GET_DEFAULT_ADVANCED)
  },
  methods: {
    ...mapActions('InvoicesList', [
      'ADD_DEFAULT_BASIC',
      'CLEAR_DEFAULT_BASIC',
      'ADD_DEFAULT_ADVANCED',
      'CLEAR_DEFAULT_ADVANCED'
    ]),
    async searchBasic(value) {
      // eventBus.$emit('on-toast', 'primary', 'Title', 'Go to <a href="https://www.google.co.th" target="_blank">Google</a>')
      this.ADD_DEFAULT_BASIC(value)
      await this.CLEAR_DEFAULT_ADVANCED()

      const params = new URLSearchParams()
      params.append('invoiceNo', value.invoiceNo || '')
      params.append('customerId', value.customerId || '')
      value.status.forEach((element) => {
        params.append('status', element)
      })
      console.log(params.toString())
      await axios({
        method: 'GET',
        url: 'http://localhost:3000/invoices',
        params: params
      })
        .then((response) => {
          this.resultList.items = response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    async searchAdvanced(value) {
      this.ADD_DEFAULT_ADVANCED(value)
      await this.CLEAR_DEFAULT_BASIC()

      const params = new URLSearchParams()
      params.append('invoiceNo', value.invoiceNo || '')
      params.append('customerId', value.customerId || '')
      params.append('dateBegin', value.dateBegin || '')
      params.append('dateUntil', value.dateUntil || '')
      console.log(params.toString())
      await axios({
        method: 'GET',
        url: 'http://localhost:3000/invoices',
        params: params
      })
        .then((response) => {
          console.log(response.data)
          this.resultList.items = response.data
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
</script>
