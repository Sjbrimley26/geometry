const Circle = require("../Circle.js");
const { divide, sin, toRadians } = require("sjb-utils/Math");

const circumcircle = {
  circumcircle: {
    get: function() {
      const { center, sideLength, sides } = this;
      return Circle.of({
        center,
        radius: divide(sideLength)(2 * sin(toRadians(180 / sides)))
      });
    }
  }
};

module.exports = circumcircle;
