<template>
  <div class="container-fluid mt-4">
    <breadcrumb :items="breadcrumbItems"/>
    <div class="card" v-if="this.detailModel">
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <div class="invoice-title">
              <img src="https://cdn5.officemate.co.th/epro/images/logo.jpg">
            </div>
            <div class="invoice-number">
              <span class="label" :class="'label-' + docStatus">{{detailModel.status}}</span>
            </div>
          </div>
          <div class="col-12 mb-2">
            <hr>
          </div>
          <div class="col-9">
            <div class="row">
              <div class="col-12">
                <address class="border">
                  <div class="left">
                    <strong>Billed To:</strong>
                    <div>John Smith</div>
                    <div>1234 Main</div>
                    <div>Apt. 4B</div>
                    <div>Springfield, ST 54321</div>
                  </div>
                  <div class="right">
                    <strong>Contact: </strong>
                    <div>John Smith</div>
                    <br>
                    <strong>Tel: </strong>
                    <div>0851123698</div>
                  </div>
                </address>
              </div>
              <div class="col-12">
                <address class="border">
                  <div class="left">
                    <strong>Shipped To:</strong>
                    <div>Kenny Rigdon</div>
                    <div>1234 Main</div>
                    <div>Apt. 4B</div>
                    <div>Springfield, ST 54321</div>
                  </div>
                  <div class="right">
                    <strong>Contact: </strong>
                    <div>John Smith</div>
                    <br>
                    <strong>Tel: </strong>
                    <div>0851123698</div>
                  </div>
                </address>
              </div>
            </div>
          </div>

          <div class="col-3">
            <address class="border d-block">
              <strong>Invoice No : </strong>
              <div>{{ detailModel.invoiceNo }}</div>
              <br>
              <strong>Customer ID : </strong>
              <div>{{ detailModel.customerId }}</div>
              <br>
              <strong>Zone : </strong>
              <div>{{ detailModel.zone }}</div>
              <br>
              <strong>Date : </strong>
              <div>{{ this.FormatDate(detailModel.date) }}</div>
            </address>
          </div>
          <div class="col-12">
            <h6 class="page-title mt-2">Orders Summary</h6>
          </div>
          <div class="col-12">
            <b-table
              class="text-left table-invoice mt-2"
              :empty-text="'No Result'"
              :show-empty="items.length==0"
              :items="items"
              :fields="fields"
            >
              <template v-slot:cell(index)="data">
                {{ data.index + 1}}
              </template>
              <template v-slot:cell(productName)="data">
                {{ data.item.productName }} <span style="font-size: 10px;">{{'( SKU: ' + data.item.sku + ' )'}}</span>
              </template>
              <template v-slot:cell(total)="data">
                {{ parseFloat(data.item.price * data.item.qty).toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,') }}
              </template>
              <!-- <template v-slot:custom-foot="data">
                <b-tr>
                  <b-th colspan="4" class="text-right">Sub Total :</b-th>
                  <b-th class="text-right">{{FormatCurrency(subTotal)}}</b-th>
                </b-tr>
                <b-tr>
                  <b-th colspan="4" class="text-right">Shipping :</b-th>
                  <b-th class="text-right">{{FormatCurrency(shipping)}}</b-th>
                </b-tr>
                <b-tr>
                  <b-th colspan="4" class="text-right">Total :</b-th>
                  <b-th class="text-right">{{FormatCurrency(subTotal + shipping)}}</b-th>
                </b-tr>
              </template> -->
            </b-table>
          </div>
          <div class="col-6 text-left mt-4">
            <router-link to="/invoices">
              <button class="btn btn-sm btn-outline-secondary">Back</button>
            </router-link>
          </div>
          <div class="col-6 text-right mt-4 print">
            <button class="btn btn-sm btn-primary" onclick="window.print()"><b-icon-printer/> Print</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {eventBus} from '@/main.js'
import BreadCrumb from '@/components/templates/bread-crumb.vue'
import axios from 'axios'
export default {
  name: 'InvoiceDetail',
  components: {
    'breadcrumb': BreadCrumb
  },
  data () {
    return {
      breadcrumbItems: [
        {
          text: 'Invoices',
          href: '#'
        },
        {
          text: 'Invoices Detail'
        }
      ],
      subTotal: 0,
      shipping: 50,
      fields: [
        {
          key: 'index',
          label: 'No.',
          thStyle: 'width:80px',
          class: 'text-center'
        },
        {
          key: 'productName',
          label: 'Item',
          thStyle: 'width:60%'
        },
        {
          key: 'qty',
          label: 'Qty',
          class: 'text-right'
        },
        {
          key: 'price',
          label: 'Price',
          class: 'text-right',
          thStyle: 'width: 150px',
          formatter: (value, key, item) => {
            return parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
          }
        },
        {
          key: 'total',
          label: 'Total',
          class: 'text-right',
          thStyle: 'width: 150px'
        }
      ],
      items: [{
        productName: 'Yamada Face Mask 3030 Green 50/Pack',
        sku: 'OFM9005417',
        qty: 2,
        price: 105,
        total: ''
      },
      {
        productName: 'Copier Paper A4 80gsm. (5Reams/Pack) ออฟฟิศเมท',
        sku: 'OFM5006696',
        qty: 2,
        price: 483,
        total: ''
      }],
      docStatus: '',
      detailModel: []
    }
  },
  created () {
    this.$nextTick(() => {
      this.onGetDetail(this.$route.query.invoiceNo)
    })
    this.items.forEach(element => {
      this.subTotal += element.qty * element.price
    })
  },
  methods: {
    async onGetDetail (invoiceNo) {
      await axios({
        method: 'GET',
        url: 'http://localhost:3000/invoices/' + invoiceNo
      }).then(response => {
        this.detailModel = response.data
        this.docStatus = this.detailModel.status.toLowerCase()
      }).catch(error => {
        console.error(error)
        eventBus.$emit('error-modal', 'no information')
      })
    }
  }
}
</script>
<style>
  .btn-delete > .b-icon {
    color: #ff5f5f;
    transition: .3s;
  }
  .btn-delete:hover > .b-icon {
    color: #fe0000;
  }
  .pagination-custom .page-item.active .page-link {
    color: #fff;
    background-color: #626262;
    border-color: #626262;
  }
  .pagination-custom .page-item .page-link {
    color: #404040;
    font-size: 12px;
    transition: .2s;
  }
  .pagination-custom .page-item.disabled .page-link{
    color: #c7c7c7;
  }
  .modal-content.no-content  > .modal-body{
    display: none;
  }
  .modal-content > .modal-footer button {
    font-size: 12px;
  }
  .modal-content.danger > .modal-header,
  .modal-content.danger > .modal-footer .confirm {
    background-color: tomato;
    color: white;
  }
</style>
