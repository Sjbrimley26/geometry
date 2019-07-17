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
  Rectangle,
  Triangle
} = polygons;
const { renderShape } = require("../canvas");

const hex = Hexagon.of({
  center: Point(420, 100),
  sideLength: 50
});

const oct = Octagon.of({
  center: Point (395, 225),
  sideLength: 35
});

const square = Square.of({
  center: Point(150, 440),
  sideLength: 150
});

const tri = EqTriangle.of({
  center: Point(300, 180),
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
  center: Point(320, 100),
  sideLength: 40
});

const rect = Rectangle.of({
  center: Point(150, 150),
  length: 100,
  width: 200
});

const ty = Triangle.from3Points(
  Point(300, 440),
  Point(310, 520),
  Point(350, 470)
);

const points = [
  Point(120, 300),
  Point(170, 290),
  Point(150, 350)
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
  three,
  tri,
  ty
];

shapes.map(s => {
  // s.circumcircle && renderShape(s.circumcircle);
  renderShape(s, "#4287f5");
  s.inscribedCircle && renderShape(s.inscribedCircle);
  s.vertices.forEach(p => renderShape(p));
});

points.map(p => renderShape(p, "#75f542"));

circle.getPointsOfIntersection(c2).map(p => renderShape(p, "#75f542"));

console.log(ty.apothem);