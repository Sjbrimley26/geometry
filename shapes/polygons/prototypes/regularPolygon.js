const circumcircle = require("./mixins/circumcircle");
const vertices = require("./mixins/vertices");
const regularApothem = require("./mixins/regularApothem");
const area = require("./mixins/area");
const inscribedCircle = require("./mixins/inscribedCircle");

const regularPolygon = {  
  ...circumcircle,
  ...vertices,
  ...regularApothem,
  ...area,
  ...inscribedCircle
};

module.exports = regularPolygon;
