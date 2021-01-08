<template>
  <div class="page-not-found" @click="redirect()">
    <div
      class="image-page-not-found"
      :style="{ 'background-image': 'url(' + require('@/assets/image/404.jpg') + ')' }">
    </div>
  </div>
</template>
<script>
export default {
  name: 'PageNotFound',
  methods: {
    redirect () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>
<style>
.page-not-found {
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.page-not-found > .image-page-not-found{
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
