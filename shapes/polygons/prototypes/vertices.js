const { PI: pi } = Math;
const { divide, toRadians } = require("sjb-utils/Math");
const { range } = require("sjb-utils/Arrays")

// use with regular polygons only
const vertices = {
  vertices: {
    get: function() {
      const { sides } = this;
      const a = divide(360)(sides);
      
      return range(0, 360, a, toRadians)
        .map(angle => this.circumcircle.getPointOnCircle(angle));
    }
  }
};

module.exports = vertices;
