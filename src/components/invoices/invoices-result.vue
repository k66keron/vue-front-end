<template>
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
          </b-table>
        </div>
      </div>
    </div>
    <div class="row" v-if="items.length > 0">
      <div class="col-sm-6 text-left">
        <div class="absolute-bottom">Total result: {{ totalResult }}</div>
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
</template>
<script>
import InputText from '@/components/share/input-text.vue'
import SelectBasic from '@/components/share/select-basic.vue'
export default {
  name: 'CustomersFilter',
  components: {
    'input-text': InputText,
    'select-basic': SelectBasic,
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
  },
  watch: {
    'data.items': function (value) {
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
          thStyle: 'width:80px',
          class: 'text-center',
        },
        {
          key: 'invoiceNo',
          label: this.$_i18n('invoiceNo'),
          thStyle: 'width: 200px',
          sortable: true,
        },
        {
          key: 'customerId',
          label: this.$_i18n('customerId'),
          thStyle: 'width: 200px',
          sortable: true,
        },
        {
          key: 'status',
          label: this.$_i18n('status'),
          class: 'text-center',
          thStyle: 'width: 200px',
          sortable: true,
        },
        {
          key: 'zone',
          label: this.$_i18n('zone'),
          thStyle: 'width: 200px',
          sortable: true,
        },
        {
          key: 'date',
          label: this.$_i18n('date'),
          class: 'text-center',
          thStyle: 'width: 160px',
          sortable: true,
          formatter: (value, key, item) => {
            return this.FormatDate(value)
          },
        },
        {
          key: 'subTotal',
          label: this.$_i18n('subTotal'),
          sortable: true,
          tdClass: 'text-right',
          formatter: (value, key, item) => {
            return this.FormatCurrency(value)
          },
        },
        {
          key: 'shipping',
          label: this.$_i18n('shipping'),
          sortable: true,
          tdClass: 'text-right',
          formatter: (value, key, item) => {
            return this.FormatCurrency(value)
          },
        },
        {
          key: 'total',
          label: this.$_i18n('total'),
          sortable: true,
          tdClass: 'text-right',
          formatter: (value, key, item) => {
            return this.FormatCurrency(item.shipping + item.subTotal)
          },
        },
      ]
    },
  },
  data() {
    return {
      items: [],
      filter: null,
      search: null,
      currentPage: 1,
      totalResult: 0,
      perPage: '5',
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
    }
  },
  methods: {
    async onFiltered(filteredItems) {
      this.totalResult = filteredItems.length
    },
  },
}
</script>
