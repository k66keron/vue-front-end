<template>
  <div
    class="input-component form-group"
    :class="horizontal"
    :style="'width:' + width"
  >
    <label v-if="label" :class="label === 'ext' ? label : ''">
      {{ label === 'ext' ? '' : label }}
    </label>
    <select
      v-model="select"
      class="form-control"
      :class="{ empty: isEmpty }"
      :disabled="disabled"
    >
      <option value="" v-if="placeholder !== ''" disabled>
        {{ placeholder }}
      </option>
      <option v-for="(item, index) in items" :key="index" :value="item.value">
        {{ item.text }}
      </option>
    </select>
  </div>
</template>
<script>
export default {
  name: 'SelectBasicComponent',
  props: {
    label: String,
    width: { type: String, default: '100%' },
    placeholder: { type: String, default: '' },
    validate: { type: Boolean, default: false },
    // format: { type: String, default: '' },
    items: {
      type: Array,
      default: () => {
        return [{}]
      },
    },
    disabled: { type: Boolean, default: false },
    defaultValue: { type: String, default: '' },
    vertical: { type: Boolean, default: false },
  },
  data() {
    return {
      select: '',
    }
  },
  mounted() {
    if (this.defaultValue !== '') {
      this.items.forEach((element) => {
        if (element.value === this.defaultValue) {
          this.select = this.defaultValue
        }
      })
    }
  },
  watch: {
    select: {
      handler: function (val) {
        this.$emit('selected', this.select)
      },
    },
    defaultValue: {
      handler: function (val) {
        this.items.forEach((element) => {
          if (element.value === this.defaultValue) {
            this.select = this.defaultValue
          }
        })
      },
    },
  },
  computed: {
    isEmpty: function () {
      if (this.validate && this.select === '') return true
    },
    horizontal: function () {
      return this.vertical ? 'horizontal' : ''
    },
  },
}
</script>
<style>
.input-component > select.empty {
  border-color: tomato;
}
</style>
