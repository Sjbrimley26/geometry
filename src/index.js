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
  center: Point(100, 200),
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
  center: Point(200, 0),
  sideLength: 40
});

const cir = Circle.of({
  center: Point(262, 100),
  radius: 32
});

const shapes = [ h, o, sq, tri, cir ];

let rotation = 0;

const render = () => {
  refresh();

  rotation++;

  if (rotation == 360) rotation = 0;

  

  shapes.forEach((s, i) => {
    s.rotation = rotation * 4;
    moveRelative(0, 3)(s);
    if (s.center.y > 500) {
      s.center.y = 500;
    }
    renderShape(s, "#0000ff")
  });

  shapes.forEach(shape => {
    shapes.forEach(other => {
      if (shape === other) return;
      let vec = detectCollision(shape, other);
      if (vec) {
        shape.center = shape.center.addVector(vec);
        moveTo(...other.center.addVector(vec.inverse()))(other);
        renderShape(shape, "#ff0000");
        renderShape(other, "#ff0000");
        debugger;
      }
    });
  });

  window.requestAnimationFrame(render);
}

render();

const p = Point(10, 10);
