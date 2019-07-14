const edges = require("./edges");
const circumcircle = require("./circumcircle");
const vertices = require("./vertices");
const perimeter = require("./perimeter");
const apothem = require("./apothem");
const area = require("./area");

const regularPolygon = {  
  ...circumcircle,
  ...vertices,
  ...edges,
  ...perimeter,
  ...apothem,
  ...area
}

module.exports = {
  edges,
  regularPolygon,
  perimeter
};
