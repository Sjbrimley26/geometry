const Polygon = require("./Polygon");
const { irregularPolygon } = require("../prototypes");

function IrregularPolygon({ center, sides }) {
  Polygon.call(this, { center, sides });
}

IrregularPolygon.prototype = Object.create(Polygon.prototype);

Object.defineProperties(IrregularPolygon.prototype, {
  ...irregularPolygon
});

module.exports = IrregularPolygon;