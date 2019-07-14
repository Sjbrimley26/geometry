const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const Circle = require("../shapes/polygons/Circle");
const Polygon = require("../shapes/polygons/generics/Polygon");

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
  for (point of polygon.vertices) {
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

const renderShape = (shape, fillStyle, strokeStyle) => {
  if (!shape instanceof Polygon) return undefined;
  if (shape instanceof Circle) {
    return renderCircle(shape, fillStyle, strokeStyle);
  }
  return renderPolygon(shape, fillStyle, strokeStyle);
}

module.exports = {
  canvas,
  ctx,
  renderShape
};
