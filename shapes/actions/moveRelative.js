import Point from "../Point";

const moveRelative = (x, y) => s => {
  const { x: sX, y: sY } = s.center;
  s.center = Point(x + sX, y + sY );
  return s;
}

export default moveRelative;
