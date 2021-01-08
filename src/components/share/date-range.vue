<template>
  <div
    class="input-component form-group"
    :class="horizontal"
    :style="'width:' + width"
  >
    <label v-if="label" :class="label === 'ext' ? label : ''">
      {{ label === 'ext' ? '' : label }}
    </label>
    <date-picker
      :placeholder="placeholder"
      v-model="date"
      type="date"
      range
      lang="en"
      format="DD/MM/YYYY"
      :class="addEmptyClass"
      @change="onChange()"
      @clear="onClear()"
    ></date-picker>
    <!-- <input
      :disabled="disabled"
      v-model="input"
      class="form-control"
      :class="[{ 'empty': addEmptyClass }, { 'icon': icon }]"
      :maxlength="maxlength"
      :placeholder="placeholder"> -->
    <!-- <b-icon v-if="icon" :icon="icon" :class="{ 'empty': addEmptyClass }"></b-icon>
    <span class="validate-text" v-if="validateText && addEmptyClass">{{validateText}}</span> -->
  </div>
</template>
<script>
// import ilbs
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
export default {
  name: 'DatePickerComponent',
  components: {
    DatePicker,
  },
  props: {
    label: String,
    width: { type: String, default: '100%' },
    // format: { type: String, default: '' }, // ถ้าค่าเป็น horizontal จะแบ่ง label กับ input เป็น 2 บรรทัด
    placeholder: { type: String, default: '' },
    isEmpty: { type: Boolean, default: false },
    default: {
      // type: [Date, String],
      // default: null
    },
    vertical: { type: Boolean, default: false },
  },
  data() {
    return {
      date: [],
      dateRange: {
        begin: '',
        until: '',
      },
      addEmptyClass: '',
    }
  },
  watch: {
    default: function (value) {
      this.date = value
      this.onChange()
    },
    isEmpty: function (value) {
      if (value) {
        this.addEmptyClass = 'empty'
      }
    },
  },
  computed: {
    horizontal: function () {
      return this.vertical ? 'horizontal' : ''
    },
  },
  methods: {
    onChange() {
      this.dateRange.begin = this.ISOString(this.date[0])
      this.dateRange.until = this.ISOString(this.date[1])
      this.addEmptyClass = ''
      this.$emit('selected', this.dateRange)
    },
    onClear() {
      this.dateRange.begin = ''
      this.dateRange.until = ''
      this.$emit('selected', this.dateRange)
    },
  },
}
</script>
