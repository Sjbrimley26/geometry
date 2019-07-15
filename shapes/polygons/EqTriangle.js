const RegularPolygon = require("./prototypes/RegularPolygon");

function EqTriangle({ center, sideLength }) {
  RegularPolygon.call(this, {
    center,
    sides: 3,
    sideLength
  });
}

EqTriangle.prototype = Object.create(RegularPolygon.prototype);

EqTriangle.of = ({ center, sideLength }) => new EqTriangle({ center, sideLength })

module.exports = EqTriangle;
