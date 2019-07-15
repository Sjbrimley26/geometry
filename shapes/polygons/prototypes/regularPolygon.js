const Polygon = require("./Polygon");
const {
  area,
  circumcircle,
  inscribedCircle,
  regularApothem,
  vertices
} = require("./mixins");

function RegularPolygon({ center, sides, sideLength }) {
  Polygon.call(this, { center, sides });
  this.sideLength = sideLength;
}

RegularPolygon.prototype = Object.create(Polygon.prototype);

Object.defineProperties(RegularPolygon.prototype, {
  ...area,
  ...circumcircle,
  ...inscribedCircle,
  ...regularApothem,
  ...vertices
});

module.exports = RegularPolygon;
