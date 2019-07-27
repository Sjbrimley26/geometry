import Line from "../Line";
import Circle from "../polygons/Circle";
import { head, sort, map } from "sjb-utils/Arrays";
import { compose } from "sjb-utils/Functions";

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

const getProjections = s => nrm => {
  const norm = nrm.toVector();
  const getDP = pnt => pnt.toVector().dotProduct(norm);

  const getMinAndMax = (res, pnt) => {
    const dp = pnt.toVector().dotProduct(norm);
    const currMin = res.length > 0 ? getDP(res[0]) : null;
    const currMax = res.length > 1 ? getDP(res[1]) : null;
    if (currMin === null) {
      return [pnt];
    }
    if (currMax === null) {
      return dp < currMin ? [pnt, res[0]] : [res[0], pnt];
    }
    if (dp < currMin) {
      return [pnt, res[1]];
    }
    if (dp > currMax) {
      return [res[0], pnt];
    }
    return res;
  };

  const pnts = s.vertices.reduce(getMinAndMax).map(p => p.addVector(norm));

  return Line(...pnts);
};

const getOverlap = (l1, l2) => { // 2 lines
  const { start: a, end: b } = l1;
  const { start: c, end: d } = l2;
  const oA = l2.isPointOnLine(a);
  const oB = l2.isPointOnLine(b);
  const oC = l1.isPointOnLine(c);
  const oD = l1.isPointOnLine(d);
  const noOverlap = !oA && !oB && !oC && !oD;
  if (noOverlap) return undefined;
  const AC = Line(a,c);
  const AD = Line(a,d);
  const BC = Line(b,c);
  const BD = Line(b,d);
  const mpv = head(sort((a, b) => a.length - b.length)([
    AC,
    AD,
    BC,
    BD
  ]));
  return mpv ? mpv.toVector() : undefined;
}

const detectCollision = (a, b) => {
  // uses the Separating Axis Theorem
  const aIsCircle = a instanceof Circle;
  const bIsCircle = b instanceof Circle;
  let normals, mpv;

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

  const axes = distinct("slope")(normals);
  const aProjections = axes.map(getProjections(a));
  const bProjections = axes.map(getProjections(b));
  for (const i in aProjections) {
    const aP = aProjections[i];
    const bP = bProjections[i];
    const overlap = getOverlap(aP, bP);
    if (!overlap) {
      return undefined;
    }
    if (!mpv || mpv.magnitude > overlap.magnitude) {
      mpv = overlap;
      continue;
    }
  }
  return mpv;
}

export default detectCollision;
