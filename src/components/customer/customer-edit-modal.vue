<template>
  <!-- edit modal -->
  <b-modal
    :title="$t('editInfo')"
    :hideHeaderClose="true"
    content-class="info"
    ref="edit-modal"
    size="lg"
    @hidden="onClose"
  >
    <div slot="default">
      <div class="row">
        <div class="col-sm-6">
          <div class="row">
            <div class="col-12">
              <input-text
                :defaultValue="editValue.name"
                @value="formEditInfo.name = $event"
                :validateText="
                  validateEditInfo.name ? $t('placeholder.name') : ''
                "
                :isEmpty="validateEditInfo.name"
                :label="$t('name') + '*'"
                vertical
                type="text"
                maxlength="30"
                :placeholder="$t('placeholder.name')"
              ></input-text>
            </div>
            <div class="col-12">
              <input-text
                :defaultValue="editValue.surname"
                @value="formEditInfo.surname = $event"
                :validateText="
                  validateEditInfo.surname ? $t('placeholder.surname') : ''
                "
                :isEmpty="validateEditInfo.surname"
                :label="$t('surname') + '*'"
                vertical
                type="text"
                maxlength="30"
                :placeholder="$t('placeholder.surname')"
              ></input-text>
            </div>
            <div class="col-12">
              <input-text
                :defaultValue="editValue.phone"
                @value="formEditInfo.phone = $event"
                :label="$t('phone')"
                vertical
                type="number"
                maxlength="10"
                :placeholder="$t('placeholder.phone')"
                width="calc(100% - 120px)"
              ></input-text>
              <input-text
                :defaultValue="editValue.phoneExt"
                @value="formEditInfo.phoneExt = $event"
                label="ext"
                vertical
                type="number"
                maxlength="5"
                :placeholder="$t('placeholder.ext')"
                width="120px"
              ></input-text>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="row">
            <div class="col-12">
              <input-text
                :label="$t('email') + '*'"
                vertical
                maxlength="30"
                type="email"
                placeholder="Email"
                :defaultValue="editValue.email"
                disabled
              ></input-text>
            </div>
            <div class="col-12">
              <input-text
                textarea
                @value="formEditInfo.address = $event"
                :label="$t('address')"
                vertical
                maxlength="255"
                :placeholder="$t('placeholder.address')"
                :defaultValue="editValue.address"
              ></input-text>
            </div>
          </div>
        </div>
        <div class="col-12">
          <b-form-radio-group v-model="editValue.status" name="status-radios">
            <b-form-radio value="Active"
              ><span class="label label-active">Active</span></b-form-radio
            >
            <b-form-radio value="InActive"
              ><span class="label label-inactive">InActive</span></b-form-radio
            >
          </b-form-radio-group>
        </div>
      </div>
    </div>
    <div slot="modal-footer">
      <button type="button" class="btn cancel" @click="onClose()">
        {{ $t('cancel') }}
      </button>
      <button
        type="button"
        class="btn confirm"
        @click="
          $_validateForm('formEditInfo', 'validateEditInfo', 'submitEditInfo')
        "
      >
        {{ $t('ok') }}
      </button>
    </div>
  </b-modal>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { eventBus } from '@/main.js'

import InputText from '@/components/share/input-text.vue'
export default {
  name: 'CustomerEditModal',
  components: {
    'input-text': InputText,
  },
  props: {
    targetEdit: { type: String, default: '' },
  },
  data() {
    return {
      editValue: {
        name: '',
        surname: '',
        phone: '',
        phoneExt: '',
        email: '',
        address: '',
        status: '',
      },
      formEditInfo: {
        name: '',
        surname: '',
        phone: '',
        phoneExt: '',
        address: '',
      },
      validateEditInfo: {
        name: false,
        surname: false,
      },
    }
  },
  computed: {
    firstRowOnPage() {
      return this.perPage * (this.currentPage - 1) + 1
    },
    ...mapGetters('CustomerStorage', ['GET_CUSTOMER']),
  },
  mounted() {},
  watch: {
    targetEdit: {
      handler: function (val) {
        if (val) {
          this.$refs['edit-modal'].show()
          this.$nextTick(() => {
            this.editValue.name = this.GET_CUSTOMER(val).name
            this.editValue.surname = this.GET_CUSTOMER(val).surname
            this.editValue.phone = this.GET_CUSTOMER(val).phone
            this.editValue.phoneExt = this.GET_CUSTOMER(val).phoneExt
            this.editValue.email = this.GET_CUSTOMER(val).email
            this.editValue.address = this.GET_CUSTOMER(val).address
            this.editValue.status = this.GET_CUSTOMER(val).status
          })
        } else {
          this.$refs['edit-modal'].hide()
          this.$nextTick(() => {
            this.editValue = {
              name: '',
              surname: '',
              phone: '',
              phoneExt: '',
              email: '',
              address: '',
              status: '',
            }
          })
        }
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions('CustomerStorage', ['EDIT_CUSTOMER_DATA']),
    onClose() {
      this.$refs['edit-modal'].hide()
      setTimeout(() => {
        this.$emit('close')
      }, 500)
    },
    submitEditInfo() {
      this.EDIT_CUSTOMER_DATA({
        cid: this.targetEdit,
        edit: {
          name: this.formEditInfo.name,
          surname: this.formEditInfo.surname,
          phone: this.formEditInfo.phone,
          phoneExt: this.formEditInfo.phoneExt,
          address: this.formEditInfo.address,
          status: this.editValue.status,
        },
      })
      eventBus.$emit('on-toast', 'success', 'Success', 'Update complete.')
      this.onClose()
    },
  },
}
</script>
