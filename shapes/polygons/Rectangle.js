const Point = require("../Point");
const { divide } = require("../../utils/Math");

function Rectangle({ center, length, width }) {
  this.center = center;
  this.length = length;
  this.width = width;
}

Object.defineProperties(Rectangle.prototype, {
  area: {
    get: function() { return this.length * this.width }
  },

  vertices: {
    get: function() {
      const { center, length, width } = this;
      const { x, y } = center;
      return [
        Point.of(x + divide(width)(2), y + divide(length)(2)),
        Point.of(x + divide(width)(2), y - divide(length)(2)),
        Point.of(x - divide(width)(2), y - divide(length)(2)),
        Point.of(x - divide(width)(2), y + divide(length)(2))
      ];
    }
  }
});

Rectangle.of = ({ center, length, width }) => new Rectangle({ center, length, width })

module.exports = Rectangle;
