const Polygon = require("./prototypes/Polygon");
const Circle = require("./Circle");
const Line = require("../Line");

function Triangle(...points) {
  Polygon.call(this, { center: null, sides: 3 });
  this.vertices = [...points];
}

Triangle.prototype = Object.create(Polygon.prototype);

Object.defineProperties(Triangle.prototype, {
  center: {
    get: function() {
      const { vertices, midpoints } = this;
      const [s0, s1] = vertices;
      const [ignore, e0, e1] = midpoints;
      const l0 = Line(s0, e0);
      const l1 = Line(s1, e1);
      return l0.getPointOfIntersection(l1);
    }
  },

  inscribedCircle: {
    get: function() {
      const { center, apothem } = this;
      return Circle.of({ center, radius: apothem });
    }
  }
})

Triangle.from3Points = (...points) => new Triangle(...points);

module.exports = Triangle;
