import Circle from "../../Circle";

const inscribedCircle = {
  inscribedCircle: {
    get: function() {
      const { center, apothem } = this;
      return Circle.of({
        center,
        radius: apothem
      });
    }
  }
};

export default inscribedCircle;
