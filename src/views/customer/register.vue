<template>
  <div class="container-fluid mt-4">
    <breadcrumb :items="breadcrumbItems" />
    <div class="row">
      <div class="col-md-4 col-lg-3">
        <div class="card">
          <div class="card-body pb-0" v-if="reloadInfo">
            <div class="row">
              <div class="col-12">
                <input-text
                  @value="formInfo.name = $event"
                  :validateText="
                    validateInfo.name ? $t('placeholder.name') : ''
                  "
                  :isEmpty="validateInfo.name"
                  :label="$t('name') + '*'"
                  vertical
                  type="text"
                  maxlength="30"
                  :placeholder="$t('placeholder.name')"
                ></input-text>
              </div>
              <div class="col-12">
                <input-text
                  @value="formInfo.surname = $event"
                  :validateText="
                    validateInfo.surname ? $t('placeholder.surname') : ''
                  "
                  :isEmpty="validateInfo.surname"
                  :label="$t('surname') + '*'"
                  vertical
                  type="text"
                  maxlength="30"
                  :placeholder="$t('placeholder.surname')"
                ></input-text>
              </div>
              <div class="col-12">
                <input-text
                  @value="formInfo.phone = $event"
                  :label="$t('phone')"
                  vertical
                  type="number"
                  maxlength="10"
                  :placeholder="$t('placeholder.phone')"
                  width="calc(100% - 120px)"
                ></input-text>
                <input-text
                  @value="formInfo.phoneExt = $event"
                  label="ext"
                  vertical
                  type="number"
                  maxlength="5"
                  :placeholder="$t('placeholder.ext')"
                  width="120px"
                ></input-text>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <input-text
                  @value=";(formInfo.email = $event), (emailExist = false)"
                  :validateText="
                    validateInfo.email
                      ? $t('placeholder.email')
                      : '' || /\S+@\S+\.\S+/.test(formInfo.email)
                      ? ''
                      : $t('placeholder.emailType')
                  "
                  :isEmpty="validateInfo.email"
                  :specific="emailExist"
                  :specificText="emailExist ? $t('emailExist') : ''"
                  :label="$t('email') + '*'"
                  vertical
                  maxlength="30"
                  type="email"
                  :placeholder="$t('placeholder.email')"
                  :defaultValue="formInfo.email"
                ></input-text>
              </div>
              <div class="col-12">
                <input-text
                  textarea
                  @value="formInfo.address = $event"
                  :label="$t('address')"
                  vertical
                  maxlength="255"
                  :placeholder="$t('placeholder.address')"
                ></input-text>
              </div>
              <div class="col-sm-12 text-left">
                <button
                  class="btn btn-primary form-group"
                  @click="
                    $_validateForm('formInfo', 'validateInfo', 'submitFormInfo')
                  "
                >
                  {{ $t('register') }}
                </button>
                <button
                  class="btn btn-secondary form-group ml-2"
                  @click="resetCustomers"
                >
                  {{ $t('cancel') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8 col-lg-9">
        <div class="card">
          <customer-list :data="customerList"></customer-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { eventBus } from '@/main.js'
// import component
import BreadCrumb from '@/components/templates/bread-crumb.vue'
import CustomerList from '@/components/customer/customer-list.vue'
import InputText from '@/components/share/input-text.vue'
export default {
  name: 'Customers',
  components: {
    breadcrumb: BreadCrumb,
    'customer-list': CustomerList,
    'input-text': InputText,
  },
  data() {
    return {
      breadcrumbItems: [
        {
          text: 'Customer',
          href: '#',
        },
        {
          text: 'Register',
        },
      ],
      reloadInfo: true,
      formInfo: {
        email: '',
        name: '',
        surname: '',
        phone: '',
        phoneExt: '',
        address: '',
      },
      validateInfo: {
        email: false,
        name: false,
        surname: false,
      },
      customerList: {
        items: [],
      },
      emailExist: false,
    }
  },
  computed: {
    ...mapGetters('CustomerStorage', [
      'GET_CUSTOMER_DATA',
      'GET_CUSTOMER_ERROR',
    ]),
  },
  mounted() {
    // this.CLEAR_CUSTOMER_DATA()
    this.customerList.items = Object.assign([], this.GET_CUSTOMER_DATA)
    setInterval(() => {
      // this.ADD_CUSTOMER_DATA(this.formInfo)
    }, 500)
  },
  watch: {
    GET_CUSTOMER_DATA(val, oldVal) {
      this.customerList.items = Object.assign([], val)
    },
  },
  methods: {
    ...mapActions('CustomerStorage', [
      'ADD_CUSTOMER_DATA',
      'CLEAR_CUSTOMER_DATA',
    ]),
    resetCustomers() {
      this.$_clearForm('formInfo', 'reloadInfo')
      this.validateInfo = {
        email: false,
        name: false,
        surname: false,
      }
      this.emailExist = false
    },
    async submitFormInfo() {
      if (/\S+@\S+\.\S+/.test(this.formInfo.email)) {
        this.ADD_CUSTOMER_DATA({
          index: this.GET_CUSTOMER_DATA.length,
          cid:
            this.GET_CUSTOMER_DATA.length +
            '-' +
            Math.random().toString(36).substring(7),
          email: this.formInfo.email,
          name: this.formInfo.name,
          surname: this.formInfo.surname,
          phone: this.formInfo.phone,
          phoneExt: this.formInfo.phoneExt,
          address: this.formInfo.address,
          status: 'Active',
        })
        if (!this.GET_CUSTOMER_ERROR) {
          eventBus.$emit(
            'on-toast',
            'success',
            'Success',
            'Insert data complete.'
          )
          this.$_clearForm('formInfo', 'reloadInfo')
        } else {
          eventBus.$emit('on-toast', 'danger', 'Warning', 'This email exists.')
          this.emailExist = true
        }
      }
    },
  },
}
</script>
