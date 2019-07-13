const { PI: pi } = Math;
const Point = require("../Point");
const Line = require("../Line");
const Circle = require("./Circle");
const { divide, cos } = require("../../utils/Math");

function EqTriangle({ center, sideLength }) {
  this.center = center;
  this.sideLength = sideLength;
}

Object.defineProperties(EqTriangle.prototype, {
  circumcircle: {
    get: function() {
      const { center, sideLength } = this;
      return Circle.of({
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
  }
});

module.exports = EqTriangle;
