const Polygon = require("./Polygon");
const inscribedCircle = require("./mixins/inscribedCircle");

function IrregularPolygon({ center, sides }) {
  Polygon.call(this, { center, sides });
}

IrregularPolygon.prototype = Object.create(Polygon.prototype);

Object.defineProperties(IrregularPolygon.prototype, {
  ...inscribedCircle
});

module.exports = IrregularPolygon;