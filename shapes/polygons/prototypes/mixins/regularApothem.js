const { divide, tan, toRadians } = require("sjb-utils/Math");

// use with regular polygons only
const apothem = {
  apothem: {
    get: function() {
      const { sideLength, sides } = this;
      return Math.abs(
        divide(sideLength)(2 * tan(toRadians(180 / sides)))
      );
    }
  }
};

module.exports = apothem;
