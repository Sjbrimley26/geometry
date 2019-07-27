import { Point, Line, polygons } from "../shapes";
import { multiply, toRadians, add } from "sjb-utils/Math";
import { addTimer } from "sjb-utils/Time";

const {
  EqTriangle,
  Hexagon,
  Circle,
  Square,
  Pentagon,
  Octagon,
  Rectangle,
  Triangle,
  prototypes
} = polygons;

import { renderShape, refresh } from "../canvas";
import { rotatePoint, moveRelative, detectCollision, moveTo } from "../shapes/actions";

const h = Hexagon.of({
  center: Point(100, 100),
  sideLength: 20
});

const o = Octagon.of({
  center: Point(200, 100),
  sideLength: 20
});

const sq = Square.of({
  center: Point(200, 180),
  sideLength: 20
});

const tri = EqTriangle.of({
  center: Point(120, 80),
  sideLength: 40
});

const cir = Circle.of({
  center: Point(270, 100),
  radius: 32
});

const shapes = [ h, o, sq, tri, cir ];

const hOrigin = h.center;

let rotation = 0;

const render = addTimer(() => {
  refresh();

  rotation++;

  if (rotation == 360) rotation = 0;

  const newHPos = rotatePoint(o.center, rotation)(hOrigin);
  moveTo(newHPos.x, newHPos.y)(h);

  shapes.forEach((s, i) => {
    s.rotation = i % 2 == 0 ? rotation * 2 : rotation;
    renderShape(s, "#0000ff")
  });

  shapes.forEach(shape => {
    shapes.forEach(other => {
      if (shape === other) return;
      if (detectCollision(shape, other)) {
        renderShape(shape, "#ff0000");
      }
    });
  });

  window.requestAnimationFrame(render);
});

render();
