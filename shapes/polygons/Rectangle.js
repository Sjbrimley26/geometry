import Point from "../Point";
import Circle from "./Circle";
import { divide } from "sjb-utils/Math";
import IrregularPolygon from "./prototypes/IrregularPolygon";
import { rotatePoint } from "../actions";

function Rectangle({ center, length, width }) {
  IrregularPolygon.call(this, { center, sides: 4 });
  this.length = length;
  this.width = width;
}

Rectangle.prototype = Object.create(IrregularPolygon.prototype);

Object.defineProperties(Rectangle.prototype, {
  area: {
    get: function() { return this.length * this.width }
  },

  vertices: {
    get: function() {
      const { center, length, width, rotation } = this;
      const { x, y } = center;
      return [
        Point(x + divide(width)(2), y + divide(length)(2)),
        Point(x + divide(width)(2), y - divide(length)(2)),
        Point(x - divide(width)(2), y - divide(length)(2)),
        Point(x - divide(width)(2), y + divide(length)(2))
      ].map(rotatePoint(center, rotation));
    }
  },

  circumcircle: {
    get: function() {
      const points = this.vertices.slice(0, 3);
      console.log(points);
      return Circle.from3Points(...points);
    }
  }
});

Rectangle.of = ({ center, length, width }) => new Rectangle({ center, length, width })

export default Rectangle;
