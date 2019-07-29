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
import { movable } from "../physics/mixins";

import { RTree } from "../shapes/datastructures";

const rTree = new RTree();

const h = Hexagon.of({
  center: Point(100, 200),
  sideLength: 20
});

const o = Octagon.of({
  center: Point(180, 100),
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
  radius: 15
});

const h2 = Hexagon.of({
  center: Point(240, 0),
  sideLength: 20
});

const sq2 = Square.of({
  center: Point(200, 300),
  sideLength: 30
});

const tri2 = EqTriangle.of({
  center: Point(120, 40),
  sideLength: 40
});

const shapes = [ 
  h,
  o,
  sq,
  tri,
  cir,
  h2,
  sq2,
  tri2
].map(s => {
  return Object.assign(s, movable(10));
});

let rotation = 0;

const render = addTimer(() => {
  refresh();
  rTree.empty();
  
  rotation++;
  if (rotation == 360) rotation = 0;

  shapes.forEach((s, i) => {
    // s.rotation = rotation * 2;
    s.fall();
    s.move();
    if (s.center.y > 500) {
      s.center.y = 500;
      s.speed.y = 0;
    }
    rTree.insertShape(s)
    renderShape(s, "#0000ff")
  });

  rTree.children.forEach(child => {
    renderShape(child.box, "rgba(0,0,0,0)");

    
    child.children && child.children.forEach(c => {
      renderShape(c.box, "rgba(0,0,0,0)", "#ff0000");

      c.children && c.children.forEach(g => {
        renderShape(g.box, "rgba(0,0,0,0)", "#00ff00");
      })

    })
    

  })

  rTree.detectCollision(detectCollision, (shape, other, vec) => {
    shape.center = shape.center.addVector(vec);
    moveTo(...other.center.addVector(vec.inverse()))(other);
    shape.center.y = shape.center.y > 500 ? 500 : shape.center.y;
    other.center.y = other.center.y > 500 ? 500 : other.center.y;
    renderShape(shape, "#ff0000");
    renderShape(other, "#ff0000");
  })

  debugger;
  window.requestAnimationFrame(render);
})

render();
