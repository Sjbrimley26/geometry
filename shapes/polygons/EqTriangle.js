const { PI: pi } = Math;
const { pow, sqrt, multiply } = require("sjb-utils/Math");
const { regularPolygon } = require("./prototypes");
const Polygon = require("./Polygon");

function EqTriangle({ center, sideLength }) {
  Polygon.call(this, { center, sides: 3 });
  this.sideLength = sideLength;
}

EqTriangle.prototype = Object.create(Polygon.prototype);

Object.defineProperties(EqTriangle.prototype, {
  ...regularPolygon
});

EqTriangle.of = ({ center, sideLength }) => new EqTriangle({ center, sideLength })

module.exports = EqTriangle;
