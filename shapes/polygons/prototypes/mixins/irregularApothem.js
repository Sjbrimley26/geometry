const { min } = require("sjb-utils/Math");
const { get } = require("sjb-utils/Objects");
const Line = require("../../../Line");

const irregularApothem = {
  apothem: {
    get: function() {
      const { edges, center } = this;
      return min(
        edges.map(get("center")).map(p => Line(center, p).length)
      );
    }
  }
};

module.exports = irregularApothem;
