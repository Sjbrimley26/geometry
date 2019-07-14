const edges = require("./mixins/edges");
const perimeter = require("./mixins/perimeter");
const irregularApothem = require("./mixins/irregularApothem");

const polygon = {
  ...edges,
  ...perimeter,
  ...irregularApothem
};

module.exports = polygon;
