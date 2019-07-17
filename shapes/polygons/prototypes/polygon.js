const edges = require("./mixins/edges");
const perimeter = require("./mixins/perimeter");
const irregularApothem = require("./mixins/irregularApothem");
const midpoints = require("./mixins/midpoints");
const normals = require("./mixins/normals");

function Polygon({ center, sides }) {
  this.center = center;
  this.sides = sides;
}

Object.defineProperties(Polygon.prototype, {
  ...edges,
  ...perimeter,
  ...irregularApothem,
  ...midpoints,
  ...normals
});

module.exports = Polygon;
