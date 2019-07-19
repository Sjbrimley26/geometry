import edges from "./mixins/edges";
import perimeter from "./mixins/perimeter";
import irregularApothem from "./mixins/irregularApothem";
import midpoints from "./mixins/midpoints";
import normals from "./mixins/normals";

function Polygon({ center, sides }) {
  this.center = center;
  this.sides = sides;
}

Object.defineProperties(Polygon.prototype, {
  ...edges,
  ...perimeter,
  ...irregularApothem,
  ...midpoints,
  ...normals
});

export default Polygon;
