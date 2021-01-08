export default {
  methods: {
    $_onStatus (e, check, model) {
      if (e.target.name !== 'all') {
        const data = e.target.value
        const index = this.$data[model].status.indexOf(data)
        if (check) {
          if (index === -1) {
            this.$data[model].status.push(data)
          }
        } else {
          this.$data[model].status.splice(index, 1)
        }
      } else {
        if (check) {
          this.$data[model].status = []
          Object.keys(this.$data[model].isStatus).forEach(key => {
            this.$data[model].isStatus[key] = true
            if (key !== 'all') this.$data[model].status.push(key)
          })
        } else {
          Object.keys(this.$data[model].isStatus).forEach(key => {
            this.$data[model].isStatus[key] = false
          })
          this.$data[model].status = []
        }
      }
    },
    $_onSelectedDateBasic (value) {
      this.filterBasic.dateBegin = value.begin
      this.filterBasic.dateUntil = value.until
      this.validateBasic.dateUntil = false
    },
    $_onSelectedDateAdvanced (value) {
      this.filterAdvanced.dateBegin = value.begin
      this.filterAdvanced.dateUntil = value.until
      this.validateAdvanced.dateUntil = false
    },
    $_searchBasic () {
      this.$emit('searchBasic', this.filterBasic)
    },
    $_searchAdvanced () {
      this.$emit('searchAdvanced', this.filterAdvanced)
    }
  }
}
