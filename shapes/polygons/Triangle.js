import Polygon from "./prototypes/Polygon";
import Circle from "./Circle";
import Line from "../Line";
import { rotatePoint } from "../actions";

function Triangle(...points) {
  this.sides = 3;
  this._vertices = [...points];
  this.rotation = 0;
}

Triangle.prototype = Object.create(Polygon.prototype);

Object.defineProperties(Triangle.prototype, {
  center: {
    get: function() {
      const { _vertices } = this;
      const [s0, s1, s2] = _vertices;
      const edges = [
        Line(s0, s1),
        Line(s1, s2),
        Line(s2, s0)
      ];
      const midpoints = edges.map(e => e.center);
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
  },

  vertices: {
    get: function() {
      const { rotation, _vertices, center } = this;
      return _vertices.map(rotatePoint(center, rotation));
    }
  },

  circumcircle: {
    get: function() {
      return Circle.from3Points(...this.vertices);
    }
  }
});

Triangle.from3Points = function(...points) {
  return new Triangle(...points);
}

export default Triangle;
