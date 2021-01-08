<template>
  <div
    class="input-component form-group"
    :class="horizontal"
    :style="'width:' + width"
  >
    <label v-if="label" :class="label === 'ext' ? label : ''">
      {{ label === 'ext' ? '' : label }}
    </label>
    <input
      v-if="!textarea"
      :disabled="disabled"
      v-model="input"
      class="form-control"
      :class="[{ empty: addEmptyClass || errorEmail }]"
      :maxlength="maxlength"
      :placeholder="placeholder"
    />
    <textarea
      v-else
      :class="{ empty: addEmptyClass }"
      v-model="input"
      rows="4"
      :style="'height:' + height"
      :placeholder="placeholder"
    >
    </textarea>
    <span class="validate-text" v-if="addEmptyClass || errorEmail">
      {{ validateText }}
    </span>
  </div>
</template>
<script>
export default {
  name: 'InputTextComponent',
  props: {
    label: String,
    width: { type: String, default: '100%' },
    height: { type: String, default: '110px' },
    maxlength: { type: String, default: '255' },
    placeholder: { type: String, default: '' },
    isEmpty: { type: Boolean, default: false },
    validateText: { type: String, default: '' },
    type: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    defaultValue: { type: String, default: '' },
    textarea: { type: Boolean, default: false },
    vertical: { type: Boolean, default: false },
  },
  computed: {
    horizontal: function () {
      return this.vertical ? 'horizontal' : ''
    },
    addEmptyClass: function () {
      if (this.isEmpty && this.input === '') {
        return true
      }
    },
  },
  data() {
    return {
      input: '',
      errorEmail: false,
    }
  },
  watch: {
    defaultValue: {
      handler: function (val) {
        this.input = val
      },
      deep: true,
    },
    input: {
      handler: function (val) {
        val = val.replace(/['\\',\\'\\,':',';','\t','\n','\r','\n']/g, '')
        switch (this.type) {
          case 'text':
            val = val.replace(/[^a-zA-Zก-๛\s]/g, '')
            break
          case 'number':
            val = val.replace(/[^0-9/.\s]/g, '')
            break
          case 'email':
            if (/\S+@\S+\.\S+/.test(this.input) === false) {
              this.errorEmail = true
            } else {
              this.errorEmail = false
            }
        }
        this.input = val
        this.$emit('value', val)
      },
    },
    disabled: {
      handler: function (val) {
        if (val) this.input = ''
      },
    },
  },
}
</script>
<style>
.input-component.horizontal > .validate-text {
  top: 7px;
  left: auto;
  right: 15px;
  pointer-events: none;
}
</style>
