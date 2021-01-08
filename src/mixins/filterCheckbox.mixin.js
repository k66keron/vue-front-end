export default {
  methods: {
    async $_onSelectAll(value, target, model) {
      this.itemsCheckbox = [];
      this[model].forEach(async (element) => {
        element.checkbox = value;
        if (value && element.success !== true) {
          this.itemsCheckbox.push({
            [target]: element[target],
          });
        } else {
          element.checkbox = false;
        }
      });
    },
    async $_onSelectCheckbox(value, data, target) {
      if (value) {
        await this.itemsCheckbox.push({
          [target]: data,
        });
      } else {
        await this.itemsCheckbox.splice(
          this.itemsCheckbox.findIndex((el) => el[target] === data),
          1
        );
      }
    },
    async $_onAction(target) {
      for (const doc of this.itemsCheckbox.sort((a, b) =>
        a[target] > b[target] ? 1 : -1
      )) {
        await this.onProcess(doc[target]);
      }
      this.itemsCheckbox = [];
    },
  },
};
