<template>
  <b-toast :id="id" :variant="style" solid>
    <template v-slot:toast-title>
      <div class="d-flex flex-grow-1 align-items-baseline">
        <strong class="mr-auto" v-html="title"></strong>
      </div>
    </template>
    <template v-slot:default>
      <div v-html="body"></div>
    </template>
  </b-toast>
</template>
<script>
import { eventBus } from '@/main.js'
export default {
  name: 'ToastComponent',
  data() {
    return {
      body: '',
      style: '',
      title: ''
    }
  },
  computed: {
    id() {
      const result = Math.random().toString(36).substring(7)
      return result
    }
  },
  mounted() {
    eventBus.$on('on-toast', (style, title, body) => {
      this.style = style
      this.title = title
      this.body = body
      this.$bvToast.show(this.id)
    })
  },
  beforeDestroy () {
    eventBus.$off('on-toast', () => {
      this.$bvToast.hide('my-toast')
    })
  },
  methods: {}
}
</script>
