const { PI: pi } = Math;
const { pow, sqrt, multiply } = require("sjb-utils/Math");
const { regularPolygon } = require("./prototypes");
const Polygon = require("./Polygon");

function Hexagon({ center, sideLength }) {
  Polygon.call(this, { center, sides: 6 });
  this.sideLength = sideLength;
}

Hexagon.prototype = Object.create(Polygon.prototype);

Object.defineProperties(Hexagon.prototype, {
  ...regularPolygon
});

Hexagon.of = ({ center, sideLength }) => new Hexagon({ center, sideLength });

module.exports = Hexagon;
