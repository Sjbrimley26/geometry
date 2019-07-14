const { sum } = require("sjb-utils/Math");
const { get } = require("sjb-utils/Objects");

const perimeter = {
  perimeter: {
    get: function() {
      return sum(this.edges.map(get("length")));
    }
  }
};

module.exports = perimeter;
