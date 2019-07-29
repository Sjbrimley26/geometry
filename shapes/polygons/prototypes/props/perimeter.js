import { sum } from "sjb-utils/Math";
import { get } from "sjb-utils/Objects";

const perimeter = {
  perimeter: {
    get: function() {
      return sum(this.edges.map(get("length")));
    }
  }
};

export default perimeter;
