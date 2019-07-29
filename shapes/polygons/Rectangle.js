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

Rectangle.prototype.covers = function(rec) {
  const { 
    leftmost: l1,
    rightmost: r1,
    topmost: t1,
    bottommost: b1
  } = this;

  const { 
    leftmost: l2,
    rightmost: r2,
    topmost: t2,
    bottommost: b2
  } = rec;

  if (
    l2 >= l1 &&
    r2 <= r1 &&
    t2 >= t1 &&
    b2 <= b1
  ) {
    return true;
  }
  return false;
}

Rectangle.prototype.overlaps = function(rec) {
  const { 
    leftmost: l1,
    rightmost: r1,
    topmost: t1,
    bottommost: b1
  } = this;

  const { 
    leftmost: l2,
    rightmost: r2,
    topmost: t2,
    bottommost: b2
  } = rec;

  if (
    l1 > r2 ||
    r1 < l2 ||
    t1 > b2 ||
    b1 < t2
  ) {
    return false;
  }
  return true;
}

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
      return Circle.from3Points(...points);
    }
  },

  leftmost: {
    get: function() {
      return this.center.x - this.width / 2;
    }
  },

  rightmost: {
    get: function() {
      return this.center.x + this.width / 2;
    }
  },

  topmost: {
    get: function() {
      return this.center.y - this.length / 2;
    }
  },

  bottommost: {
    get: function() {
      return this.center.y + this.length / 2;
    }
  }
});

Rectangle.of = ({ center, length, width }) => new Rectangle({ center, length, width })

Rectangle.MBB = function(points) {
  if (points.length < 3) return undefined;
  
  let left, right, top, bottom;

  points.forEach(p => {
    if (!left) {
      left = p.x;
      right = p.x;
      top = p.y;
      bottom = p.y;
      return;
    }
    if (left > p.x) {
      left = p.x;
    }
    if (right < p.x) {
      right = p.x;
    }
    if (top > p.y) {
      top = p.y;
    }
    if (bottom < p.y) {
      bottom = p.y;
    }
  });

  const center = Point((left + right) / 2, (top + bottom) / 2);
  const length = bottom - top;
  const width = right - left;

  return Rectangle.of({ center, length, width });
}

export default Rectangle;
