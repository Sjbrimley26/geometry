import Polygon from "./Polygon";
import inscribedCircle from "./props/inscribedCircle";

function IrregularPolygon({ center, sides }) {
  Polygon.call(this, { center, sides });
}

IrregularPolygon.prototype = Object.create(Polygon.prototype);

Object.defineProperties(IrregularPolygon.prototype, {
  ...inscribedCircle
});

export default IrregularPolygon;