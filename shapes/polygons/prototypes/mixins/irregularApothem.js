const { min } = require("sjb-utils/Math");
const { get } = require("sjb-utils/Objects");
const Line = require("../../../Line");

const irregularApothem = {
  apothem: {
    get: function() {
      const { edges, center } = this;
      return min(
        edges.map(get("center")).map(p => {
        const length = Line(center, p).length;
        return length;
      }));
    }
  }
};

module.exports = irregularApothem;
