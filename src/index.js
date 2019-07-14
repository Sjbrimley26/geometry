const { Point, Line, polygons } = require("../shapes");
const {
  EqTriangle,
  Hexagon,
  Circle,
  Square,
  Pentagon,
  Polygon
} = polygons;
const { renderShape } = require("../canvas");

const hex = Hexagon.of({
  center: Point(100, 100),
  sideLength: 50
});

const rect = Square.of({
  center: Point(100, 300),
  sideLength: 150
});

const tri = EqTriangle.of({
  center: Point(200, 200),
  sideLength: 50
});

const circle = Circle.of({
  center: Point(250, 300),
  radius: 20
});

const pent = Pentagon.of({
  center: Point(250, 100),
  sideLength: 40
});

const shapes = [
  hex,
  rect,
  tri,
  circle,
  pent
];

shapes.map(s => renderShape(s, "#4287f5"));

console.log(rect instanceof Polygon)
