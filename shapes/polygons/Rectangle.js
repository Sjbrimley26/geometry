const Point = require("../Point");
const { divide } = require("sjb-utils/Math");
const IrregularPolygon = require("./prototypes/IrregularPolygon");

function Rectangle({ center, length, width }) {
  IrregularPolygon.call(this, { center, sides: 4 });
  this.length = length;
  this.width = width;
}

Rectangle.prototype = Object.create(IrregularPolygon.prototype);

Object.defineProperties(Rectangle.prototype, {
  area: {
    get: function() { return this.length * this.width }
  },

  vertices: {
    get: function() {
      const { center, length, width } = this;
      const { x, y } = center;
      return [
        Point(x + divide(width)(2), y + divide(length)(2)),
        Point(x + divide(width)(2), y - divide(length)(2)),
        Point(x - divide(width)(2), y - divide(length)(2)),
        Point(x - divide(width)(2), y + divide(length)(2))
      ];
    }
  }
});

Rectangle.of = ({ center, length, width }) => new Rectangle({ center, length, width })

module.exports = Rectangle;
