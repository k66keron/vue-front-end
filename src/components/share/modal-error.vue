<template>
  <b-modal
    :title="title"
    :hideHeaderClose="true"
    :content-class="pattern"
    :size="size"
    no-close-on-backdrop
    ref="modal"
  >
    <div slot="default">
      <div>
        {{ bodyText }}
      </div>
    </div>
    <div slot="modal-footer">
      <button type="button" class="btn btn-sm cancel" @click="onClose">
        Close
      </button>
    </div>
  </b-modal>
</template>

<script>
import { eventBus } from '@/main.js'
export default {
  name: 'ModalComponent',
  props: {
    title: { type: String, default: 'Error' },
    size: { type: String, default: 'sm' },
  },
  data() {
    return {
      pattern: 'danger',
      remark: '',
      bodyText: '',
    }
  },
  mounted() {
    eventBus.$on('error-modal', (text) => {
      this.$refs.modal.show()
      this.bodyText = text
    })
  },
  beforeDestroy() {
    eventBus.$off('error-modal', () => {
      this.$refs.modal.hide()
      this.bodyText = ''
    })
  },
  methods: {
    onClose() {
      this.$nextTick(() => {
        this.$refs.modal.hide()
      })
      // this.$router.push({ path: '/' + this.$route.path.split('/')[1] })
    },
  },
}
</script>
<style>
.modal-content.no-content > .modal-body {
  display: none;
}
.modal-content > .modal-footer button {
  font-size: 12px;
}
/* danger */
.modal-content.danger > .modal-header {
  background-color: tomato;
  color: white;
}
.modal-content.danger > .modal-footer .confirm {
  background-color: tomato;
  color: white;
}
/* approve */
.modal-content.approve > .modal-header {
  background-color: olivedrab;
  color: white;
}
.modal-content.approve > .modal-footer .confirm {
  background-color: olivedrab;
  color: white;
}
/* info */
.modal-content.info > .modal-header {
  background-color: #17a2b8;
  color: white;
}
.modal-content.info > .modal-footer .confirm {
  background-color: #17a2b8;
  color: white;
}
</style>
