const Point = require("./Point");
const { 
  divide,
  multiply,
  subtract,
  sqrt,
  pow,
  toFixedFloat,
  cos,
  sin,
} = require("sjb-utils/Math");

function line(start, end) {
  this.start = start;
  this.end = end;
}

line.prototype.isPointOnLine = function(point) {
  const { x, y } = this.start;
  return multiply(point.x - x)(this.slope) === subtract(point.y)(y);
}

line.prototype.intersectsWith = function(line2) {
  // https://www.geeksforgeeks.org/check-if-two-given-line-segments-intersect/
  const { start: p1, end: q1 } = this;
  const { start: p2, end: q2 } = line2;
  const o1 = Point.orientation(p1, q1, p2);
  const o2 = Point.orientation(p1, q1, q2);
  const o3 = Point.orientation(p2, q2, p1);
  const o4 = Point.orientation(p2, q2, q1);
  
  // General case
  if (o1 != o2 && o3 != o4) return true;
  
  // Special Cases 
  // p1, q1 and p2 are colinear and p2 lies on segment p1q1 
  if (o1 == 0 && this.isPointOnLine(p2)) return true;
  // p1, q1 and q2 are colinear and q2 lies on segment p1q1 
  if (o2 == 0 && this.isPointOnLine(q2)) return true;
  // p2, q2 and p1 are colinear and p1 lies on segment p2q2 
  if (o3 == 0 && line2.isPointOnLine(p1)) return true;
  // p2, q2 and q1 are colinear and q1 lies on segment p2q2 
  if (o4 == 0 && line2.isPointOnLine(q1)) return true;
  return false; // Doesn't fall in any of the above cases
}

line.prototype.getPointOfIntersection = function(line2) {
  const { start, slope: m0 } = this;
  const { x: x0, y: y0 } = start;
  const { start: s1, slope: m1 } = line2;
  const { x: x1, y: y1 } = s1;
  if (
    !this.intersectsWith(line2) ||
    this.slope == line2.slope
  ) {
    return undefined;
  }

  return Point(
            toFixedFloat((m0*x0 - m1*x1 + y1 - y0) / (m0 - m1), 2),
            toFixedFloat((m0*m1*(x1-x0) + m1*y0 - m0*y1) / (m1 - m0), 2)
          );
}

line.prototype.getPerpendicular = function() {
  const inv = -1 * divide(1)(this.slope);
  const { x, y } = this.center;
  const b = subtract(y)(inv * x);
  const x0 = x - Math.floor(this.length);
  const y0 = x0 * inv + b;
  const x1 = x + Math.floor(this.length);
  const y1 = x1 * inv + b;
  return Line(Point(x0, y0), Point(x1, y1));
}

Object.defineProperties(line.prototype, {
  slope: {
    get: function() {
      if (this.start.x == this.end.x) return undefined;
      return divide(this.end.y - this.start.y)(this.end.x - this.start.x);
    }
  },

  length: {
    get: function() {
      return sqrt(
        pow(this.end.x - this.start.x)(2) + 
        pow(this.end.y - this.start.y)(2)
      );
    },
    set: function(len) {
      const { x, y } = this.start;
      const angle = toFixedFloat(Math.atan(this.slope), 2);
      this.end = Point(
        toFixedFloat(len * sin(angle) - x, 2),
        toFixedFloat(len * cos(angle) - y, 2)
      );
      return true;
    }
  },
  
  distance: {
    get: function() { return this.length; },
    set: function(d) {
      this.length = d;
      return true;
    }
  },

  center: {
    get: function() {
      return Point(
        divide(this.end.x + this.start.x)(2),
        divide(this.end.y + this.start.y)(2)
      );
    }
  },

  yInt: {
    get: function() {
      if (this.start.x == this.end.x) {
        return this.start.y == 0 ? 0 : false;
      }
      if (this.start.y == this.end.y) {
        return this.start.y;
      }
      return subtract(this.start.y)(this.slope * this.start.x);
    }
  },

  xInt: {
    get: function() {
      if (this.start.y == this.end.y) {
        return this.start.x == 0 ? 0: false;
      }
      if (this.start.x == this.end.x) {
        return this.start.x;
      }
      return divide(-1 * (this.slope * this.start.x - this.start.y))(this.slope);
    }
  }
});

const Line = (p1, p2) => new line(p1, p2)

module.exports = Line;
