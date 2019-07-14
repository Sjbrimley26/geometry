const { divide, tan } = require("sjb-utils/Math");

// use with regular polygons only
const apothem = {
  apothem: {
    get: function() {
      const { sideLength, sides } = this;
      return divide(sideLength)(2 * tan(180 / sides));
    }
  }
};

module.exports = apothem;
