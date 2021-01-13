<template>
  <div class="card-body">
    <div class="row">
      <div class="col-sm-6">
        <input-text
          @value="search = $event"
          :disabled="items.length == 0"
          :placeholder="$t('placeholder.search')"
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
            :empty-text="$t('noResult')"
            :empty-filtered-text="$t('noResult')"
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
            <template v-slot:cell(invoiceNo)="data">
              <router-link
                :to="{
                  path: '/invoices/detail',
                  query: { invoiceNo: data.item.invoiceNo },
                }"
                >{{ data.item.invoiceNo }}</router-link
              >
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
                class="btn btn-edit pt-0 pb-0"
                @click="targetEdit = data.item.cid"
              >
                <b-icon-pencil></b-icon-pencil>
              </button>
              <button
                class="btn btn-delete pt-0 pb-0"
                @click="
                  targetRemove = {
                    cid: data.item.cid,
                    email: data.item.email,
                  }
                "
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
          {{ $t('totalResult') }}: {{ totalResult }}
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
    <customer-modal-edit :targetEdit="targetEdit" @close="targetEdit = ''" />
    <customer-modal-remove
      :targetRemove="targetRemove"
      @close="targetRemove = {}"
    />
  </div>
</template>
<script>
import InputText from '@/components/share/input-text.vue'
import SelectBasic from '@/components/share/select-basic.vue'
import CustomerModalEdit from '@/components/customer/customer-edit-modal.vue'
import CustomerModalRemove from '@/components/customer/customer-remove-modal.vue'

export default {
  name: 'CustomersFilter',
  components: {
    'input-text': InputText,
    'select-basic': SelectBasic,
    'customer-modal-edit': CustomerModalEdit,
    'customer-modal-remove': CustomerModalRemove,
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          items: [],
        }
      },
    },
    field: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
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
      // fields: [
      // {
      //   key: 'index',
      //   label: this.$_i18n('no'),
      //   thStyle: 'width:60px',
      //   class: 'text-center',
      // },
      // {
      //   key: 'name',
      //   label: this.$_i18n('customerName'),
      //   thStyle: 'width: 240px',
      //   sortable: true,
      //   formatter: (value, key, item) => {
      //     return value + ' ' + item.surname
      //   },
      // },
      // {
      //   key: 'phone',
      //   label: this.$_i18n('phone'),
      //   thStyle: 'width: 120px',
      //   sortable: true,
      //   formatter: (value, key, item) => {
      //     return value + ' ' + item.phoneExt
      //   },
      // },
      // {
      //   key: 'email',
      //   label: this.$_i18n('email'),
      //   thStyle: 'width: 200px',
      //   sortable: true,
      // },
      // {
      //   key: 'address',
      //   label: this.$_i18n('address'),
      //   thStyle: 'width: 200px',
      //   sortable: true,
      // },
      // {
      //   key: 'status',
      //   label: this.$_i18n('status'),
      //   class: 'text-center',
      //   thStyle: 'width: 100px',
      //   sortable: true,
      // },
      // {
      //   key: 'action',
      //   label: this.$_i18n('action'),
      //   thStyle: 'width: 120px',
      //   thClass: 'text-center',
      //   tdClass: 'text-center',
      // },
      // ],
      targetEdit: '',
      targetRemove: {},
    }
  },
  watch: {
    'data.items': function (value) {
      console.log(value)
      this.items = value
      this.totalResult = value.length
    },
  },
  computed: {
    firstRowOnPage() {
      return this.perPage * (this.currentPage - 1) + 1
    },
    fields() {
      return [
        {
          key: 'index',
          label: this.$_i18n('no'),
          thStyle: 'width:60px',
          class: 'text-center',
        },
        {
          key: 'name',
          label: this.$_i18n('customerName'),
          thStyle: 'width: 240px',
          sortable: true,
          formatter: (value, key, item) => {
            return value + ' ' + item.surname
          },
        },
        {
          key: 'phone',
          label: this.$_i18n('phone'),
          thStyle: 'width: 120px',
          sortable: true,
          formatter: (value, key, item) => {
            return value + ' ' + item.phoneExt
          },
        },
        {
          key: 'email',
          label: this.$_i18n('email'),
          thStyle: 'width: 200px',
          sortable: true,
        },
        {
          key: 'address',
          label: this.$_i18n('address'),
          thStyle: 'width: 200px',
          sortable: true,
        },
        {
          key: 'status',
          label: this.$_i18n('status'),
          class: 'text-center',
          thStyle: 'width: 100px',
          sortable: true,
        },
        {
          key: 'action',
          label: this.$_i18n('action'),
          thStyle: 'width: 120px',
          thClass: 'text-center',
          tdClass: 'text-center',
        },
      ]
    },
  },
  methods: {
    async onFiltered(filteredItems) {
      this.totalResult = filteredItems.length
    },
  },
}
</script>
