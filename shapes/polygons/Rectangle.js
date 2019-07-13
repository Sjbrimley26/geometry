const Point = require("../Point");
const { divide } = require("sjb-utils/Math");
const { edges } = require("./prototypes");

function rectangle({ center, length, width }) {
  this.center = center;
  this.length = length;
  this.width = width;
}

Object.defineProperties(rectangle.prototype, {
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

const Rectangle =
  ({ center, length, width }) => new rectangle({ center, length, width })

module.exports = Rectangle;
