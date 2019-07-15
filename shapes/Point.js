const { round } = Math;

function point(x, y) {
  this.x = round(x);
  this.y = round(y);
}

const Point = (x, y) => new point(x, y)

Point.orientation = (p1, p2, p3) => {
  // https://www.geeksforgeeks.org/orientation-3-ordered-points/
  // 0 == colinear
  // 1 == clockwise
  // 2 == counter-clockwise
  const val = (p2.y - p1.y) * (p3.x - p2.x) -
    (p2.x - p1.x) * (p3.y - p2.y);

  if (val == 0) return 0; // colinear 

  return (val > 0) ? 1 : 2; // clock or counter-clockwise 
};

module.exports = Point;
