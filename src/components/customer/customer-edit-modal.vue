<template>
  <!-- edit modal -->
  <b-modal
    title="Edit info"
    :hideHeaderClose="true"
    content-class="info"
    ref="edit-modal"
    size="lg"
    @hidden="onClose"
  >
    <div slot="default">
      <div class="row">
        <div class="col-sm-12 col-md-4">
          <input-text
            @value="formEditInfo.name = $event"
            :validate="validateEditInfo.name"
            labelText="Name"
            placeholder="Enter your name"
            format="label-row"
            type="text"
            :defaultValue="editValue.name"
          ></input-text>
        </div>
        <div class="col-sm-12 col-md-4">
          <input-text
            @value="formEditInfo.surname = $event"
            :validate="validateEditInfo.surname"
            labelText="Surname"
            placeholder="Enter your surname"
            format="label-row"
            type="text"
            :defaultValue="editValue.surname"
          ></input-text>
        </div>
        <div class="col-sm-12 col-md-4">
          <input-text
            @value="formEditInfo.phone = $event"
            :validate="validateEditInfo.phone"
            width="70%"
            labelText="Phone"
            maxlength="10"
            placeholder="Enter your phone"
            format="label-row"
            type="number"
            :defaultValue="editValue.phone"
          ></input-text>
          <input-text
            @value="formEditInfo.phoneExt = $event"
            width="30%"
            labelText="ext"
            maxlength="3"
            placeholder="Ext."
            format="label-row"
            type="number"
            :defaultValue="editValue.phoneExt"
          ></input-text>
        </div>
      </div>
    </div>
    <div slot="modal-footer">
      <button type="button" class="btn cancel" @click="onClose()">
        CANCEL
      </button>
      <button
        type="button"
        class="btn confirm"
        @click="
          $_validateForm('formEditInfo', 'validateEditInfo', 'submitEditInfo')
        "
      >
        SUBMIT
      </button>
    </div>
  </b-modal>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

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
      },
      formEditInfo: {
        name: '',
        surname: '',
        phone: '',
        phoneExt: '',
      },
      validateEditInfo: {
        // name: false,
        // surname: false,
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
          })
        } else {
          this.editValue = {
            name: '',
            surname: '',
            phone: '',
            phoneExt: '',
            email: '',
            address: '',
          }
          this.$refs['edit-modal'].hide()
        }
      },
      deep: true,
    },
  },
  methods: {
    onClose() {
      this.$refs['edit-modal'].hide()
      this.$emit('close')
    },
    submitEditInfo() {
      console.log(this.formEditInfo)
    },
  },
}
</script>
