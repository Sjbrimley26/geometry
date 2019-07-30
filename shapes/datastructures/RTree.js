import { Rectangle } from "../polygons";
import Point from "../Point";
import { get } from "sjb-utils/Objects";

import {
  MAP_HEIGHT,
  MAP_WIDTH,
  MAP_CENTER
} from "../../config";

import { compose } from "sjb-utils/Functions";
import { head, sort, compact } from "sjb-utils/Arrays";

function IndexNode(box) {
  this.box = box;
  this.children = [];
}

function LeafNode(box, obj) {
  this.box = box;
  this.obj = obj;
}

function RTree() {
  this.box = Rectangle.of({
    center: Point(...MAP_CENTER),
    length: MAP_HEIGHT,
    width: MAP_WIDTH
  });
  this.children = [];
}

const insertShape = function(shape) {
  const mbb = Rectangle.MBB(shape.vertices);

  if (this.children.length < 3) {
    const leaf = new LeafNode(mbb, shape);
    this.children.push(leaf);
    return;
  }

  const potentialBoxes = this.children.map(child => {
    const { box } = child;
    const pnts = box.vertices.concat(mbb.vertices);
    return { child, box: Rectangle.MBB(pnts) };
  });

  const smallestBox = compose(
    head,
    sort((a, b) => a.box.perimeter - b.box.perimeter)
  )(potentialBoxes);

  const i = this.children.indexOf(smallestBox.child);
  
  if (this.children[i] instanceof IndexNode) {
    this.children[i].insertShape(shape);
    this.children[i].box = smallestBox.box;
    return;
  }

  const child = this.children[i];
  const node = new IndexNode(smallestBox.box);
  node.insertShape(shape);
  node.insertShape(child.obj);
  this.children[i] = node;
}

RTree.prototype.insertShape = insertShape;
IndexNode.prototype.insertShape = insertShape;

RTree.prototype.empty = function() {
  this.children = [];
  return this;
}

const checkIfChildrenOverlap = children => {
  if (children.length < 2) return false;
  const dups = [...children];
  const overlaps = compact(children.map(child => {
    const overlap = [];

    dups.forEach(c => {
      if (c == child) return;
      if (child.box.overlaps(c.box)) {
        overlap.push(c);
      }
    });

    if (overlap.length == 0) return undefined;

    const res = new Map();
    res.set(child, overlap);
    return res;
  }));

  if (overlaps.length == 0) return false;

  return overlaps;
}

const appendObjectsToList = (list, children) => {
  children.forEach(child => {
    if (child instanceof LeafNode) {
      list.push(child.obj);
    } else {
      appendObjectsToList(list, child.children);
    }
  });
  return list;
}

const detectCollision = function(detectorFn, cb) {
  if (this.children.length < 2) return false;
  const overlaps = checkIfChildrenOverlap(this.children);
  
  if (overlaps) {
    const objects = overlaps.map(overlap => {
      const objList = [];
      const overlapping = [...overlap.values()];
      const children = [...overlap.keys()];
      overlapping.forEach(o => o.forEach(x => children.push(x)));
      return appendObjectsToList(objList, children);
    });

    objects.forEach(shapeArr => {
      shapeArr.forEach(shape => {
        shape.collided = false;
        shapeArr.forEach(other => {
          if (shape === other) return;
          let vec = detectorFn(shape, other);
          if (vec) {
            return cb(shape, other, vec);
          }
        });
      });
    });

    const children = overlaps.map(o => [...o.keys()]);

    this.children.filter(c => !children.includes(c)).forEach(child => {
      if (child instanceof LeafNode) return false;
      child.detectCollision(detectorFn, cb);
    })

    return;
  }

  this.children.forEach(child => {
    if (child instanceof LeafNode) return false;
    child.detectCollision(detectorFn, cb);
  })
}

RTree.prototype.detectCollision = detectCollision;
IndexNode.prototype.detectCollision = detectCollision;

export default RTree;

