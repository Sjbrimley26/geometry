const Point = require("./shapes/Point");
const EqTriangle = require("./shapes/polygons/EqTriangle");
const Line = require("./shapes/Line");

const test = EqTriangle({
  center: Point(0, 0),
  sideLength: 5
});

const l1 = Line(Point(0, 0), Point(10, 10));
const l2 = Line(Point(0, 10), Point(10, 0));

console.log(test.circumcircle);
