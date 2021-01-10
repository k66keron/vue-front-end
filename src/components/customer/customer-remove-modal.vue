<template>
  <!-- edit modal -->
  <b-modal
    title="Remove Customer"
    :hideHeaderClose="true"
    content-class="danger"
    ref="remove-modal"
    size="sm"
    @hidden="onClose"
  >
    <div slot="default">
      <div class="row">
        <div class="col-12">
          Remove
          <span style="color: tomato">{{ targetRemove.email }}</span> from
          Customer list ?
        </div>
      </div>
    </div>
    <div slot="modal-footer">
      <button type="button" class="btn cancel" @click="onClose">CANCEL</button>
      <button type="button" class="btn confirm" @click="removeCustomer">
        OK
      </button>
    </div>
  </b-modal>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { eventBus } from '@/main.js'

export default {
  name: 'CustomerRemoveModal',

  props: {
    targetRemove: { type: Object, default: () => {} },
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters('CustomerStorage', ['GET_CUSTOMER']),
  },
  mounted() {},
  watch: {
    targetRemove: {
      handler: function (val) {
        if (Object.keys(val).length) {
          this.$refs['remove-modal'].show()
        } else {
          this.$refs['remove-modal'].hide()
        }
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions('CustomerStorage', ['REMOVE_CUSTOMER_DATA']),
    onClose() {
      this.$refs['remove-modal'].hide()
      setTimeout(() => {
        this.$emit('close')
      }, 500)
    },
    removeCustomer() {
      this.REMOVE_CUSTOMER_DATA({
        cid: this.targetRemove.cid,
        email: this.targetRemove.email,
      })
      eventBus.$emit('on-toast', 'success', 'Success', 'Remove complete.')
      this.onClose()
    },
  },
}
</script>
