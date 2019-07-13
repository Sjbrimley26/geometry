const Point = require("../Point");
const { divide } = require("sjb-utils/Math");
const { edges } = require("./prototypes");

function Rectangle({ center, length, width }) {
  this.center = center;
  this.length = length;
  this.width = width;
  this.sides = 4;
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
        Point(x + divide(width)(2), y + divide(length)(2)),
        Point(x + divide(width)(2), y - divide(length)(2)),
        Point(x - divide(width)(2), y - divide(length)(2)),
        Point(x - divide(width)(2), y + divide(length)(2))
      ];
    }
  },

  ...edges
});

Rectangle.of = ({ center, length, width }) => new Rectangle({ center, length, width })

module.exports = Rectangle;
