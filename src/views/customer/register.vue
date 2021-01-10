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
                  :validateText="validateInfo.name ? 'Please insert Name' : ''"
                  :isEmpty="validateInfo.name"
                  label="Name"
                  vertical
                  type="text"
                  maxlength="30"
                  placeholder="Name"
                ></input-text>
              </div>
              <div class="col-12">
                <input-text
                  @value="formInfo.surname = $event"
                  :validateText="
                    validateInfo.surname ? 'Please insert Surname' : ''
                  "
                  :isEmpty="validateInfo.surname"
                  label="Surname"
                  vertical
                  type="text"
                  maxlength="30"
                  placeholder="Surname"
                ></input-text>
              </div>
              <div class="col-12">
                <input-text
                  @value="formInfo.phone = $event"
                  label="Phone"
                  vertical
                  type="number"
                  maxlength="10"
                  placeholder="Phone"
                  width="calc(100% - 120px)"
                ></input-text>
                <input-text
                  @value="formInfo.phoneExt = $event"
                  label="ext"
                  vertical
                  type="number"
                  maxlength="5"
                  placeholder="ext"
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
                      ? 'Please insert email'
                      : '' || /\S+@\S+\.\S+/.test(formInfo.email)
                      ? ''
                      : 'Incorrect email format'
                  "
                  :isEmpty="validateInfo.email"
                  :specific="emailExist"
                  :specificText="emailExist ? 'This email exists' : ''"
                  label="Email"
                  vertical
                  maxlength="30"
                  type="email"
                  placeholder="Email"
                  :defaultValue="formInfo.email"
                ></input-text>
              </div>
              <div class="col-12">
                <input-text
                  textarea
                  @value="formInfo.address = $event"
                  label="Address"
                  vertical
                  maxlength="255"
                  placeholder="Please enter your address..."
                ></input-text>
              </div>
              <div class="col-sm-12 text-left">
                <button
                  class="btn btn-primary form-group"
                  @click="
                    $_validateForm('formInfo', 'validateInfo', 'submitFormInfo')
                  "
                >
                  Register
                </button>
                <button
                  class="btn btn-secondary form-group ml-2"
                  @click="resetCustomers"
                >
                  Reset
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
