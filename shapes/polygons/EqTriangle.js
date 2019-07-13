const { PI: pi } = Math;
const Circle = require("./Circle");
const { divide, cos, pow, sqrt, multiply } = require("sjb-utils/Math");
const { pipe } = require("sjb-utils/Functions");
const { edges } = require("./prototypes");

function eqTriangle({ center, sideLength }) {
  this.center = center;
  this.sideLength = sideLength;
}

Object.defineProperties(eqTriangle.prototype, {
  circumcircle: {
    get: function() {
      const { center, sideLength } = this;
      return Circle({
        center,
        radius: divide(sideLength / 2)(cos(pi / 6))
      });
    }
  },

  vertices: {
    get: function() {
      return [
        pi / 2,
        7 * pi / 6,
        11 * pi / 6
      ].map(angle => this.circumcircle.getPointOnCircle(angle));
    }
  },

  area: {
    get: function() {
      return multiply(pow(this.sideLength)(2))(sqrt(3) / 4)
    }
  },
  
  ...edges
});

const EqTriangle =
  ({ center, sideLength }) => new eqTriangle({ center, sideLength });

module.exports = EqTriangle;
