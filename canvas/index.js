const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

import Circle from "../shapes/polygons/Circle";
import Polygon from "../shapes/polygons/prototypes/Polygon";

const renderPolygon = (
  polygon,
  fillStyle = "#ffffff",
  strokeStyle = "#000000"
) => {
  let hasDrawnFirstPoint = false;
  const startPoint = polygon.vertices[0];
  ctx.beginPath();
  ctx.fillStyle = fillStyle;
  ctx.strokeStyle = strokeStyle;
  for (let point of polygon.vertices) {
    if (!hasDrawnFirstPoint) {
      ctx.moveTo(point.x, point.y);
      hasDrawnFirstPoint = true;
      continue;
    }
    ctx.lineTo(point.x, point.y);
  }
  ctx.lineTo(startPoint.x, startPoint.y);
  ctx.fill();
  ctx.stroke();
}

const renderCircle = (
  { center, radius },
  fillStyle = "#ffffff",
  strokeStyle = "#000000"
) => {
  const { x, y } = center;
  ctx.beginPath();
  ctx.fillStyle = fillStyle;
  ctx.strokeStyle = strokeStyle;
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
}

const renderLine = (
  { start, end },
  strokeStyle = "#000000"
) => {
  const { x: x0, y: y0 } = start;
  const { x: x1, y: y1 } = end;
  ctx.beginPath();
  ctx.strokeStyle = strokeStyle;
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
}

const renderShape = (shape, fillStyle, strokeStyle) => {
  if (shape instanceof Circle) {
    return renderCircle(shape, fillStyle, strokeStyle);
  }
  if (shape instanceof Polygon) {
    return renderPolygon(shape, fillStyle, strokeStyle);
  }
  if (shape.hasOwnProperty("end")) {
    return renderLine(shape, fillStyle);
  }
  // render a point
  return renderCircle(Circle.of({ 
    center: shape,
    radius: 2.5
  }), fillStyle, fillStyle);
}

export {
  canvas,
  ctx,
  renderShape
};
