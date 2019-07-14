const { divide } = require("sjb-utils/Math");

// use with regular polygons only
const area = {
  area: {
    get: function() {
      const { perimeter, apothem } = this;
      return divide(perimeter * apothem)(2);
    }
  }
};

module.exports = area;
