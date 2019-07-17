const { 
  sin,
  cos,
  multiply,
  sqrt,
  toFixedFloat,
  pow,
  toRadians,
  add,
  subtract
} = require("sjb-utils/Math");

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

Vector.prototype.multiply = function(scalar) {
  const { x, y } = this;
  const v = Vector.of(0, 0);
  v.x = x  * scalar;
  v.y =  y * scalar;
  return v;
}

Vector.prototype.dotProduct = function(vector) {
  const { x: x0, y: y0 } = this;
  const { x: x1, y: y1 } = vector;
  // 0 == vectors are at right angles
  return add(x0 * x1)(y0 * y1);
}

Vector.prototype.crossProduct = function(vector) {
  // http://allenchou.net/2013/07/cross-product-of-2d-vectors/
  const { x: x0, y: y0 } = this;
  const { x: x1, y: y1 } = vector;
  // sign represents whether 2nd vector is on the left or right
  // sin-1(abs(crossProduct)) === the angle between the two vectors
  return subtract(x0 * y1)(y0 * x1);
}

Object.defineProperties(Vector.prototype, {
  x: {
    get: function() { 
      return multiply(this.magnitude)(cos(this.direction)) 
    },
    set: function(newX) {
      this.magnitude = sqrt(pow(newX, 2) + pow(this.y, 2));
      this.direction = toFixedFloat(toRadians(Math.atan(this.y / newX)), 2);
    }
  },
  
  y: {
    get: function () {
      return multiply(this.magnitude)(sin(this.direction))
    },
    set: function (newY) {
      this.magnitude = sqrt(pow(this.x, 2) + pow(newY, 2));
      this.direction = toFixedFloat(toRadians(Math.atan(newY / this.x)), 2);
    }
  },
});

Vector.of = (direction, magnitude) => new Vector({ direction, magnitude })

module.exports = Vector;
