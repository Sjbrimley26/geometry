const moveRelative = (x, y) => s => {
  const { x: sX, y: sY } = s.center;
  s.center = { x: x + sX, y: y + sY };
  return s;
}

export default moveRelative;
