<template>
  <!-- eslint-disable -->
  <div id="app">
    <router-view />
    <modal-error />
    <toast />
  </div>
</template>
<script>
import ModalError from '@/components/share/modal-error.vue'
import Toast from '@/components/share/toast.vue'

export default {
  name: 'App',
  components: {
    'modal-error': ModalError,
    toast: Toast
  }
}
</script>
<style>
body {
  margin: 0px;
}
#app {
  font-family: 'Prompt', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
