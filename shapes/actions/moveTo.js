const moveTo = (x, y) => shape => {
  shape.center = { x, y };
  return shape;
};

export default moveTo;
