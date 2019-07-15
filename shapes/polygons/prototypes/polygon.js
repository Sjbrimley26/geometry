const edges = require("./mixins/edges");
const perimeter = require("./mixins/perimeter");
const irregularApothem = require("./mixins/irregularApothem");

function Polygon({ center, sides }) {
  this.center = center;
  this.sides = sides;
}

Object.defineProperties(Polygon.prototype, {
  ...edges,
  ...perimeter,
  ...irregularApothem
});

module.exports = Polygon;
