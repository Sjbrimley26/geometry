const polygon = require("../prototypes/polygon");

function Polygon({ center, sides }) {
  this.center = center;
  this.sides = sides;
}

Object.defineProperties(Polygon.prototype, {
  ...polygon
});

module.exports = Polygon;
