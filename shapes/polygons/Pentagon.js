const RegularPolygon = require("./generics/RegularPolygon");

function Pentagon({ center, sideLength }) {
  RegularPolygon.call(this, {
    center,
    sides: 5,
    sideLength
  });
}

Pentagon.prototype = Object.create(RegularPolygon.prototype);

Pentagon.of = ({ center, sideLength }) => new Pentagon({ center, sideLength })

module.exports = Pentagon;
