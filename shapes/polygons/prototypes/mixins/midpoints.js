const { get } = require("sjb-utils/Objects");

const midpoints = {
  midpoints: {
    get: function () {
      return this.edges.map(get("center"));
    }
  }
};

module.exports = midpoints;
