import { Point, Line, polygons } from "../shapes";
import { multiply, toRadians, add } from "sjb-utils/Math";
import { get } from "sjb-utils/Objects";
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

const { Polygon } = prototypes;

import { renderShape, refresh } from "../canvas";
import { rotatePoint, moveRelative, detectCollision } from "../shapes/actions";

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
  center: Point(300, 300),
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
  pent,
  three,
  tri,
  ty
];

let rotation = 0;
let startPos = three.center;

const render = () => {
  refresh();

  if (rotation === 359) {
    rotation = -1;
  }
  rotation += 1;

  const p = Point(300, 300);
  three.center = rotatePoint(p, rotation * 2)(startPos);

  shapes.forEach(s => {
    // s.circumcircle && renderShape(s.circumcircle);
    renderShape(s, "#4287f5");
    // s.inscribedCircle && renderShape(s.inscribedCircle);
    // s.vertices.forEach(p => renderShape(p));
    renderShape(s.center);
    s.rotation = rotation;

    
    shapes.forEach(other => {
      if (s === other) return;
      if (detectCollision(s, other)) {
        renderShape(s, "#ff0000");
      }
    })
    
  });

  const l = Line(p, three.center);
  renderShape(l);

  moveRelative(0.5, 0)(ty);

  /*
  ty.center.x += 1;
  This one doesn't work

  ty.center = { x: ty.center.x + 1, y: ty.center.y };
  This one does

  square.center.x +=1;
  This works too, though.
  I imagine because the vertices are based around the center
  for regular polygons and its the other way around for Triangles.

  */

  window.requestAnimationFrame(render);
}

const timedRender = addTimer(render);

timedRender();
