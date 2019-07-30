import { 
  sin,
  cos,
  multiply,
  sqrt,
  toFixedFloat,
  pow,
  toRadians,
  add,
  subtract
} from "sjb-utils/Math";

function Vector({ direction, magnitude }) {
  this.direction = direction;
  this.magnitude = magnitude;
}

Vector.prototype.add = function(vector) {
  const { x: x0, y: y0 } = this;
  const { x: x1, y: y1 } = vector;
  const v = Vector.of(0, 0);
  v.x = x0 + x1;
  v.y = y0 + y1;
  return v;
}

Vector.prototype.subtract = function(vector) {
  const { x: x0, y: y0 } = this;
  const { x: x1, y: y1 } = vector;
  const v = Vector.of(0, 0);
  v.x = x0 - x1;
  v.y = y0 - y1;
  return v;
}

Vector.prototype.scale = function(scalar) {
  return Vector.of(
    this.direction,
    multiply(this.magnitude)(scalar)
  );
}

Vector.prototype.dotProduct = function(vector) {
  const x0 = this.x;
  const y0 = this.y;
  const x1 = vector.x;
  const y1 = vector.y;
  // 0 == vectors are at right angles
  return add(multiply(x0)(x1))(multiply(y0)(y1));
}

Vector.prototype.crossProduct = function(vector) {
  // http://allenchou.net/2013/07/cross-product-of-2d-vectors/
  const { x: x0, y: y0 } = this;
  const { x: x1, y: y1 } = vector;
  // sign represents whether 2nd vector is on the left or right
  // sin-1(abs(crossProduct)) === the angle between the two vectors
  return subtract(x0 * y1)(y0 * x1);
}

Vector.prototype.getPerpendicular = function() {
  const x = this.y;
  const y = -this.x;
  const magnitude = sqrt(pow(x)(2) + pow(y)(2));
  const direction = toFixedFloat(Math.atan(y/x), 2);
  return Vector.of(direction, magnitude);
}

Vector.prototype.inverse = function() {
  return Vector.of(this.direction + Math.PI, this.magnitude);
}

Object.defineProperties(Vector.prototype, {
  x: {
    get: function() { 
      return Math.round(multiply(this.magnitude)(cos(this.direction))) 
    }
  },
  
  y: {
    get: function () {
      return Math.round(multiply(this.magnitude)(sin(this.direction)))
    }
  },
});

Vector.of = (direction, magnitude) => new Vector({ direction, magnitude })

export default Vector;
