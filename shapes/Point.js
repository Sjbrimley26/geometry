import Vector from "../physics/Vector";
import { sqrt, pow, toFixedFloat } from "sjb-utils/Math";

function point(x, y) {
  this.x = Math.round(x);
  this.y = Math.round(y);
}

point.prototype.toVector = function() {
  const { x, y } = this;
  const magnitude = sqrt(pow(x)(2) + pow(y)(2));
  const direction = toFixedFloat(Math.atan(y/x), 2);
  return Vector.of(direction, magnitude);
}

point.prototype.addVector = function(vector) {
  // returns a new Point
  const { x, y } = vector;
  return Point(x + this.x, y + this.y);
}

const Point = function(x, y) {
  return new point(x, y);
}

Point.orientation = (p1, p2, p3) => {
  // https://www.geeksforgeeks.org/orientation-3-ordered-points/
  // 0 == colinear
  // 1 == clockwise
  // 2 == counter-clockwise
  const val = (p2.y - p1.y) * (p3.x - p2.x) -
    (p2.x - p1.x) * (p3.y - p2.y);

  if (val == 0) return 0; // colinear 

  return (val > 0) ? 1 : 2; // clock or counter-clockwise 
}

export default Point;
