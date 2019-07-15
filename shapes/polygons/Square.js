const Rectangle = require("./Rectangle");
const RegularPolygon = require("./prototypes/RegularPolygon");

const Square = function({ center, sideLength }) {
  Rectangle.call(this, {
    center,
    length: sideLength,
    width: sideLength
  });
  RegularPolygon.call(this, { center, sideLength });
}

Square.prototype = Object.create(Rectangle.prototype);

Square.of = ({ center, sideLength }) => new Square({ center, sideLength})

module.exports = Square;
