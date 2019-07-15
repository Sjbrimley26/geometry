const RegularPolygon = require("./prototypes/RegularPolygon");

function Hexagon({ center, sideLength }) {
  RegularPolygon.call(this, {
    center,
    sides: 6,
    sideLength
  });
}

Hexagon.prototype = Object.create(RegularPolygon.prototype);

Hexagon.of = ({ center, sideLength }) => new Hexagon({ center, sideLength })

module.exports = Hexagon;
