const { PI: pi } = Math;
const { pow, sqrt, multiply, toRadians } = require("sjb-utils/Math");
const { regularPolygon } = require("./prototypes");
const Polygon = require("./Polygon");

function Pentagon({ center, sideLength }) {
  Polygon.call(this, { center, sides: 5 });
  this.sideLength = sideLength;
}

Pentagon.prototype = Object.create(Polygon.prototype);

Object.defineProperties(Pentagon.prototype, {
  ...regularPolygon
});

Pentagon.of = ({ center, sideLength }) => new Pentagon({ center, sideLength });

module.exports = Pentagon;