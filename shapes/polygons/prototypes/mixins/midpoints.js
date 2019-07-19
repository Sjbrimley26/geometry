import { get } from "sjb-utils/Objects";

const midpoints = {
  midpoints: {
    get: function () {
      return this.edges.map(get("center"));
    }
  }
};

export default midpoints;
