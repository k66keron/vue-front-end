<template>
  <b-tabs>
    <b-tab title="Basic" active>
      <div class="body-tab">
        <div class="row align-items-end text-left">
          <div class="col-md-4 col-lg-3">
            <input-text
              @value="filterBasic.invoiceNo = $event"
              :defaultValue="filterBasic.invoiceNo"
              label="Invoice No."
              vertical
              maxlength="20"
              placeholder="Invoice No."
            ></input-text>
          </div>
          <div class="col-md-4 col-lg-3">
            <input-text
              @value="filterBasic.customerId = $event"
              :defaultValue="filterBasic.customerId"
              label="Customer ID"
              vertical
              maxlength="20"
              placeholder="Customer ID"
            ></input-text>
          </div>
          <div class="col-sm-12">
            <div class="label-text">Invoice Status</div>
          </div>
          <div class="col-sm-12">
            <div class="checkbox-filter" style="margin: 4px 0px 8px 0px">
              <label
                v-for="(value, name, index) in filterBasic.isStatus"
                :key="index"
              >
                <input
                  :name="name"
                  type="checkbox"
                  :value="name"
                  v-model="filterBasic.isStatus[name]"
                  @change="
                    $_onStatus(
                      $event,
                      filterBasic.isStatus[name],
                      'filterBasic'
                    )
                  "
                />
                <span
                  style="text-transform: capitalize"
                  :class="'label ' + 'label-' + name.toLowerCase()"
                  >{{ name }}</span
                >
              </label>
            </div>
          </div>
          <div class="col-sm-12 text-left">
            <button
              class="btn btn-primary btn-icon form-group"
              @click="$_validateForm('filterBasic', '', '$_searchBasic')"
            >
              <b-icon-search /> Search
            </button>
          </div>
        </div>
      </div>
    </b-tab>
    <b-tab title="Advanced">
      <div class="body-tab">
        <div class="row align-items-end text-left">
          <div class="col-md-4 col-lg-3">
            <input-text
              @value="filterAdvanced.invoiceNo = $event"
              :defaultValue="filterAdvanced.invoiceNo"
              :isEmpty="validateAdvanced.invoiceNo"
              label="Invoice No."
              vertical
              maxlength="20"
              placeholder="Invoice No."
            ></input-text>
          </div>
          <div class="col-md-4 col-lg-3">
            <input-text
              @value="filterAdvanced.customerId = $event"
              :defaultValue="filterAdvanced.customerId"
              :isEmpty="validateAdvanced.customerId"
              label="Customer ID"
              vertical
              maxlength="20"
              placeholder="Customer ID"
            ></input-text>
          </div>
          <div class="col-md-4 col-lg-3">
            <date-range
              @selected="$_onSelectedDateAdvanced($event)"
              label="Date Range"
              vertical
              placeholder="Select date range"
              :default="defaultDateAdvanced"
              :isEmpty="validateAdvanced.dateUntil"
            ></date-range>
          </div>
          <div class="col-sm-12">
            <div class="label-text">Invoice Status</div>
          </div>
          <div class="col-sm-12">
            <div class="checkbox-filter" style="margin: 4px 0px 8px 0px">
              <label
                v-for="(value, name, index) in filterAdvanced.isStatus"
                :key="index"
              >
                <input
                  :name="name"
                  type="checkbox"
                  :value="name"
                  v-model="filterAdvanced.isStatus[name]"
                  @change="
                    $_onStatus(
                      $event,
                      filterAdvanced.isStatus[name],
                      'filterAdvanced'
                    )
                  "
                />
                <span
                  style="text-transform: capitalize"
                  :class="'label ' + 'label-' + name.toLowerCase()"
                  >{{ name }}</span
                >
              </label>
            </div>
          </div>
          <div class="col-sm-12 text-left">
            <button
              class="btn btn-primary btn-icon form-group"
              @click="
                $_validateForm(
                  'filterAdvanced',
                  'validateAdvanced',
                  '$_searchAdvanced'
                )
              "
            >
              <b-icon-search /> Search
            </button>
          </div>
        </div>
      </div>
    </b-tab>
  </b-tabs>
</template>
<script>
// import mixin
import FilterMixin from '@/mixins/filter.mixin.js'
// import component
import InputText from '@/components/share/input-text.vue'
import DateRange from '@/components/share/date-range.vue'

export default {
  name: 'InvoiceFilter',
  mixins: [FilterMixin],
  components: {
    'input-text': InputText,
    'date-range': DateRange,
  },
  props: {
    dataBasic: {
      type: Object,
      default: () => {
        return {}
      },
    },
    dataAdvanced: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  watch: {
    dataBasic: function (value) {
      this.filterBasic = value
    },
    dataAdvanced: function (value) {
      this.filterAdvanced = value
      this.defaultDateAdvanced = [
        new Date(value.dateBegin),
        new Date(value.dateUntil),
      ]
    },
  },
  data() {
    return {
      defaultDateBasic: [],
      defaultDateAdvanced: [],
      filterStatus: ['Pending', 'Complete', 'Delete'],
      filterBasic: {
        invoiceNo: '',
        customerId: '',
        status: [],
        isStatus: {
          // all: false,
          Pending: false,
          Complete: false,
          Delete: false,
        },
      },
      filterAdvanced: {
        invoiceNo: '',
        customerId: '',
        dateBegin: '',
        dateUntil: '',
        status: [],
        isStatus: {
          // all: false,
          Pending: false,
          Complete: false,
          Delete: false,
        },
      },
      validateAdvanced: {
        dateUntil: false,
      },
    }
  },
  methods: {},
}
</script>
