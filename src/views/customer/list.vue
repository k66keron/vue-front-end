<template>
  <div class="container-fluid mt-4">
    <breadcrumb :items="breadcrumbItems" />
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-6">
                <input-text
                  @value="search = $event"
                  :disabled="items.length == 0"
                  placeholder="Search"
                  type="normal"
                  icon="search"
                  maxlength="10"
                  width="200px"
                ></input-text>
              </div>
              <div class="col-sm-6 float-right">
                <select-basic
                  class="float-right"
                  @selected="perPage = $event"
                  :items="pageItem"
                  :disabled="items.length == 0"
                  :defaultValue="perPage"
                  width="100px"
                ></select-basic>
              </div>
              <div class="col-12">
                <div class="result-block">
                  <b-table
                    class="table-result"
                    id="invoice-table"
                    ref="invoicetable"
                    :empty-text="'No Result'"
                    :empty-filtered-text="'No Result'"
                    :show-empty="items.length == 0"
                    :items="items"
                    :fields="fields"
                    :perPage="perPage"
                    :current-page="currentPage"
                    :filter="search"
                    @filtered="onFiltered"
                  >
                    <template v-slot:cell(index)="data">
                      {{ firstRowOnPage + data.index }}
                    </template>
                    <template v-slot:cell(status)="data">
                      <span
                        class="label"
                        :class="'label-' + data.value.toLowerCase()"
                        v-html="data.value"
                      ></span>
                    </template>
                    <template v-slot:cell(action)="data">
                      <button
                        class="btn btn-edit"
                        @click="targetEdit = data.item.cid"
                      >
                        <b-icon-pencil></b-icon-pencil>
                      </button>
                      <button
                        class="btn btn-delete"
                        @click="targetRemove = data.index"
                      >
                        <b-icon-x-circle-fill></b-icon-x-circle-fill>
                      </button>
                    </template>
                  </b-table>
                </div>
              </div>
            </div>
            <div class="row" v-if="items.length > 0">
              <div class="col-sm-6 text-left">
                <div class="absolute-bottom">
                  Total result: {{ totalResult }}
                </div>
              </div>
              <div class="col-sm-6 mt-2">
                <b-pagination
                  v-model="currentPage"
                  class="pagination-custom float-right"
                  aria-controls="invoice-table"
                  :total-rows="totalResult"
                  :per-page="perPage"
                  first-text="First"
                  prev-text="Prev"
                  next-text="Next"
                  last-text="Last"
                ></b-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <customer-modal-edit :targetEdit="targetEdit" @close="targetEdit = ''" />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

// import component
import BreadCrumb from '@/components/templates/bread-crumb.vue'
import InputText from '@/components/share/input-text.vue'
import SelectBasic from '@/components/share/select-basic.vue'
import CustomerModalEdit from '@/components/customer/customer-edit-modal.vue'

export default {
  name: 'CustomersFilter',
  components: {
    breadcrumb: BreadCrumb,
    'input-text': InputText,
    'select-basic': SelectBasic,
    'customer-modal-edit': CustomerModalEdit,
  },
  data() {
    return {
      breadcrumbItems: [
        {
          text: 'Customer',
          href: '#',
        },
        {
          text: 'List',
        },
      ],
      items: [],
      filter: null,
      search: null,
      currentPage: 1,
      totalResult: 0,
      perPage: '25',
      pageItem: [
        {
          text: '5',
          value: '5',
        },
        {
          text: '25',
          value: '25',
        },
        {
          text: '50',
          value: '50',
        },
      ],
      fields: [
        {
          key: 'index',
          label: 'No.',
          thStyle: 'width:80px',
          class: 'text-center',
        },
        {
          key: 'name',
          label: 'Customer Name',
          thStyle: 'width: 200px',
          sortable: true,
          formatter: (value, key, item) => {
            return value + ' ' + item.surname
          },
        },
        {
          key: 'phone',
          label: 'Phone',
          thStyle: 'width: 200px',
          sortable: true,
          formatter: (value, key, item) => {
            return value + ' ' + item.phoneExt
          },
        },
        {
          key: 'email',
          label: 'E-mail',
          thStyle: 'width: 200px',
          sortable: true,
        },
        {
          key: 'address',
          label: 'Address',
          thStyle: 'width: 200px',
          sortable: true,
        },
        {
          key: 'status',
          label: 'Status',
          class: 'text-center',
          thStyle: 'width: 200px',
          sortable: true,
        },
        {
          key: 'action',
          label: 'Action',
          thStyle: 'width:140px',
          thClass: 'text-center',
          tdClass: 'text-center',
        },
      ],
      targetEdit: '',
    }
  },
  watch: {
    'data.items': function (value) {
      this.items = value
      this.totalResult = value.length
    },
    GET_CUSTOMER_DATA(val, oldVal) {
      this.items = Object.assign([], val)
      // this.$store.getters['CustomerStorage/GET_CUSTOMER_DATA']
    },
    // targetEdit: {
    //   handler: function (val) {
    //     console.log(val)
    //     if (val) {
    //       this.editIndex = val
    //     }
    //   },
    // },
  },
  computed: {
    firstRowOnPage() {
      return this.perPage * (this.currentPage - 1) + 1
    },
    ...mapGetters('CustomerStorage', ['GET_CUSTOMER_DATA', 'GET_CUSTOMER']),
  },
  mounted() {
    this.items = Object.assign([], this.GET_CUSTOMER_DATA)
  },
  methods: {
    async onFiltered(filteredItems) {
      this.totalResult = filteredItems.length
    },
  },
}
</script>
