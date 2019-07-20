import { divide, toRadians } from "sjb-utils/Math";
import { range } from "sjb-utils/Arrays"

// use with regular polygons only
const vertices = {
  vertices: {
    get: function() {
      const { sides, rotation } = this;
      const a = divide(360)(sides);
      const start = divide(a)(2) - rotation;
      
      return range(start, 360 + start, a, toRadians)
        .map(angle => this.circumcircle.getPointOnCircle(angle));
    }
  }
};

export default vertices;
