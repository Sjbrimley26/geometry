const { Point, Line, polygons } = require("../shapes");
const { multiply } = require("sjb-utils/Math");
const { get } = require("sjb-utils/Objects");
const {
  EqTriangle,
  Hexagon,
  Circle,
  Square,
  Pentagon,
  Octagon,
  Rectangle
} = polygons;
const { renderShape } = require("../canvas");

const hex = Hexagon.of({
  center: Point(100, 100),
  sideLength: 50
});

const oct = Octagon.of({
  center: Point (175, 175),
  sideLength: 35
});

const square = Square.of({
  center: Point(150, 300),
  sideLength: 150
});

const tri = EqTriangle.of({
  center: Point(280, 180),
  sideLength: 50
});

const circle = Circle.of({
  center: Point(280, 300),
  radius: 20
});

const c2 = Circle.of({
  center: Point(310, 300),
  radius: 20
});

const pent = Pentagon.of({
  center: Point(250, 100),
  sideLength: 40
});

const rect = Rectangle.of({
  center: Point(150, 150),
  length: 100,
  width: 200
});

const points = [
  Point(120, 300),
  Point(170, 290),
  Point(150, 320)
];

const three = Circle.from3Points(
  ...points
);

const shapes = [
  rect,
  hex,
  oct,
  square,
  circle,
  c2,
  pent,
  three
];

shapes.map(s => {
  s.circumcircle && renderShape(s.circumcircle);
  renderShape(s, "#4287f5");
  // s.inscribedCircle && renderShape(s.inscribedCircle);
});

points.map(p => renderShape(p));

circle.getPointsOfIntersection(c2).map(p => renderShape(p));

const t = Line(Point(0, 0), Point(10, 10));
console.log(t.length);
t.length *= 2;
console.log(t.end);