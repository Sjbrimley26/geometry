import edges from "./props/edges";
import perimeter from "./props/perimeter";
import irregularApothem from "./props/irregularApothem";
import midpoints from "./props/midpoints";
import normals from "./props/normals";

function Polygon({ center, sides }) {
  this.center = center;
  this.sides = sides;
  this.rotation = 0;
}

Object.defineProperties(Polygon.prototype, {
  ...edges,
  ...perimeter,
  ...irregularApothem,
  ...midpoints,
  ...normals
});

export default Polygon;
