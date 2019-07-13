const { PI: pi, sin, cos, pow } = Math;
const Point = require("../Point");
const { multiply, toFixedFloat, divide, sqrt } = require("../../utils/Math");

function Circle ({center, radius}) {
  this.center = center;
  this.radius = radius;
}

Circle.prototype.getPointOnCircle = function (angle) {
  const { x, y } = this.center;
  return Point.of(
    toFixedFloat(this.radius * sin(angle) + x, 2),
    toFixedFloat(this.radius * cos(angle) + y, 2)
  );
}

Object.defineProperties(Circle.prototype, {
  vertices: {
    get: function() {
      return [
        0,
        pi / 4,
        pi / 2,
        3 * pi / 4,
        pi,
        5 * pi / 4,
        3 * pi / 2,
        7 * pi / 4
      ].map(angle => this.getPointOnCircle(angle));
    }
  },

  area: {
    get: function () {
      return multiply(pi)(pow(this.radius, 2));
    },
    set: function(a) {
      this.radius = sqrt(divide(a)(pi));
      return true;
    }
  },

  diameter: {
    get: function() {
      return multiply(this.radius)(2);
    },
    set: function(d) {
      this.radius = divide(d)(2);
      return true;
    }
  },

  circumference: {
    get: function() {
      multiply(2 * pi)(this.radius);
    },
    set: function(c) {
      this.radius = divide(c)(pi * 2);
      return true;
    }
  }
});

Circle.of = ({ center, radius }) => new Circle({center, radius})

module.exports = Circle;
