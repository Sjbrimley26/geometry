import Polygon from "./prototypes/Polygon";
import Circle from "./Circle";
import Line from "../Line";

function Triangle(...points) {
  this.sides = 3;
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
});

Triangle.from3Points = function(...points) {
  return new Triangle(...points);
}

export default Triangle;
