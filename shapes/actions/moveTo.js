import Point from "../Point";

const moveTo = (x, y) => shape => {
  shape.center = Point(x, y);
  return shape;
};

export default moveTo;
