const { PI: pi } = Math;
const Circle = require("./Circle");
const { divide, sin, pow, sqrt, multiply, toRadians } = require("sjb-utils/Math");
const { pipe } = require("sjb-utils/Functions");
const { edges, circumcircle } = require("./prototypes");

function EqTriangle({ center, sideLength }) {
  this.center = center;
  this.sideLength = sideLength;
  this.sides = 3;
}

Object.defineProperties(EqTriangle.prototype, {
  ...circumcircle,

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

EqTriangle.of = ({ center, sideLength }) => new EqTriangle({ center, sideLength });

module.exports = EqTriangle;
