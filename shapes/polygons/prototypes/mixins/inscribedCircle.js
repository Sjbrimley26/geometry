const Circle = require("../../Circle");

const inscribedCircle = {
  inscribedCircle: {
    get: function() {
      const { center, apothem } = this;
      return Circle.of({
        center,
        radius: apothem
      });
    }
  }
};

module.exports = inscribedCircle;
