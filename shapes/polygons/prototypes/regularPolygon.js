import Polygon from "./Polygon";
import {
  area,
  circumcircle,
  inscribedCircle,
  regularApothem,
  vertices
} from "./mixins";

function RegularPolygon({ center, sides, sideLength }) {
  Polygon.call(this, { center, sides });
  this.sideLength = sideLength;
}

RegularPolygon.prototype = Object.create(Polygon.prototype);

Object.defineProperties(RegularPolygon.prototype, {
  ...area,
  ...circumcircle,
  ...inscribedCircle,
  ...regularApothem,
  ...vertices
});

export default RegularPolygon;
