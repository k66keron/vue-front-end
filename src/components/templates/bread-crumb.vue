<template>
  <div class="row breadcrumb-component">
    <div class="col-12">
      <div class="page-title-box d-flex align-items-center justify-content-between">
        <h4 class="mb-0 font-size-18">{{items[1].text}}</h4><div class="page-title-right">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a :href="items[0].href" target="_self" class="">{{items[0].text}}</a>
            </li>
            <li class="breadcrumb-item active">
              <span aria-current="location">{{items[1].text}}</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumbComponent',
  props: {
    items: { type: Array, default: () => [] }
  },
  data () {
    return {
    }
  }
}
</script>
