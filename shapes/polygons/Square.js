const Rectangle = require("./Rectangle");
const { edges, circumcircle } = require("./prototypes");

const Square = function({ center, sideLength }) {
  Rectangle.call(this, {
    center,
    length: sideLength,
    width: sideLength
  });
  this.sideLength = sideLength;
}

Square.prototype = Object.create(Rectangle.prototype);

Object.defineProperties(Square.prototype, {
  ...circumcircle,
  ...edges
});

Square.of = ({ center, sideLength }) => new Square({ center, sideLength})

module.exports = Square;
