import Line from "../Line";
import Circle from "../polygons/Circle";
import { head, sort, map } from "sjb-utils/Arrays";
import { compose } from "sjb-utils/Functions";
import { min } from "sjb-utils/Math";

const distinct = prop => arr => {
  const res = [];
  const map = new Map();
  for (const item of arr) {
    if (!map.has(item[prop])) {
      map.set(item[prop], true);
      res.push(item);
    }
  }
  return res;
}

const getProjections = s => norm => {
  const getDP = pnt => pnt.toVector().dotProduct(norm);

  const getMinAndMax = (res, pnt) => {
    const dp = getDP(pnt);
    const currMin = res.length > 0 ? res[0] : null;
    const currMax = res.length > 1 ? res[1] : null;
    if (currMin === null) {
      return [dp];
    }
    if (currMax === null) {
      return dp < currMin ? [dp, res[0]] : [res[0], dp];
    }
    if (dp < currMin) {
      return [dp, res[1]];
    }
    if (dp > currMax) {
      return [res[0], dp];
    }
    return res;
  };

  const pnts = s.vertices.reduce(getMinAndMax, []);

  return pnts;
};

const getOverlap = (l1, l2) => { // 2 projections
  const [min1, max1] = l1;
  const [min2, max2] = l2;
  if (min1 > max2 || max1 < min2) return false;
  const differences = [
    min1 - min2,
    min1 - max2,
    max1 - min1,
    max1 - max2
  ];
  return min(differences);
}

const detectCollision = (a, b) => {
  // uses the Separating Axis Theorem
  const aIsCircle = a instanceof Circle;
  const bIsCircle = b instanceof Circle;
  let normals, mtv;

  if (aIsCircle && bIsCircle) {
    const l = Line(a.center, b.center)
    const overlapping = l.length <= a.radius + b.radius;
    if (!overlapping) return undefined;
    return l.toVector(); // not good it will be too long
  }

  if (aIsCircle) {
    const axis = compose(
      head,
      sort((a, b) => a.length - b.length),
      map(p => Line(p, a.center))
    )(b.vertices);
    normals = b.normals.concat(axis);
  }
  if (bIsCircle) {
    const axis = compose(
      head,
      sort((a, b) => a.length - b.length),
      map(p => Line(p, b.center))
    )(a.vertices);
    normals = a.normals.concat(axis);
  }
  else {
    normals = a.normals.concat(b.normals);
  }

  // const axes = distinct("direction")(normals);
  const axes = normals;
  const aProjections = axes.map(getProjections(a));
  const bProjections = axes.map(getProjections(b));
  for (const i in aProjections) {
    const aP = aProjections[i];
    const bP = bProjections[i];
    const o = getOverlap(aP, bP);
    if (!o) {
      return undefined;
    }
    if (!mtv || mtv > o) {
      mtv = o;
      continue;
    }
  }
  return mtv;
}

export default detectCollision;
