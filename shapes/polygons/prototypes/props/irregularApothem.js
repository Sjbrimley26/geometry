import { min } from "sjb-utils/Math";
import { get } from "sjb-utils/Objects";
import Line from "../../../Line";

const irregularApothem = {
  apothem: {
    get: function() {
      const { edges, center } = this;
      return min(
        edges.map(get("center")).map(p => Line(center, p).length)
      );
    }
  }
};

export default irregularApothem;
