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

const p = Pentagon.of({
  center: Point(260, 200),
  sideLength: 28
});

const o = Octagon.of({
  center: Point(180, 100),
  sideLength: 20
});

const tri = EqTriangle.of({
  center: Point(200, 0),
  sideLength: 40
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
  tri,
  h2,
  sq2,
  //tri2,
  p
].map(s => {
  s.center.x += 100;
  return Object.assign(s, movable({
    mass: 10,
    acceleration: 10,
    elasticity: 0.5
  }));
});

let rotation = 0;

const render = () => {
  refresh();
  rTree.empty();
  
  rotation++;
  if (rotation == 360) rotation = 0;

  shapes.forEach((s, i) => {
    // s.rotation = rotation * 2;
    s.fall();
    s.move();
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
    shape.collide(other, vec);
    renderShape(shape, "#ff0000");
    renderShape(other, "#ff0000");
  })

  debugger;
  window.requestAnimationFrame(render);
}

render();
