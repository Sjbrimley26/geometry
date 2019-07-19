import Rectangle from "./Rectangle";
import circumcircle from "./prototypes/mixins/circumcircle";

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
  ...circumcircle
});

Square.of = ({ center, sideLength }) => new Square({ center, sideLength})

export default Square;
