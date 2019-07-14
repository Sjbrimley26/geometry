const Polygon = require("./Polygon");
const { regularPolygon } = require("../prototypes");

function RegularPolygon({ center, sides, sideLength }) {
  Polygon.call(this, { center, sides });
  this.sideLength = sideLength;
}

RegularPolygon.prototype = Object.create(Polygon.prototype);

Object.defineProperties(RegularPolygon.prototype, {
  ...regularPolygon
});

module.exports = RegularPolygon;
