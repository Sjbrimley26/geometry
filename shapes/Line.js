const Point = require("./Point");
const { 
  divide,
  multiply,
  subtract,
  sqrt,
  pow 
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

Object.defineProperties(line.prototype, {
  slope: {
    get: function() {
      return divide(this.end.y - this.start.y)(this.end.x - this.start.x);
    }
  },

  length: {
    get: function() {
      return sqrt(
        pow(this.end.x - this.start.x)(2) + 
        pow(this.end.y - this.start.y)(2)
      );
    }
  },

  center: {
    get: function() {
      return Point(
        divide(this.end.x + this.start.x)(2),
        divide(this.end.y + this.start.y)(2)
      );
    }
  }
});

const Line = (p1, p2) => new line(p1, p2)

module.exports = Line;
