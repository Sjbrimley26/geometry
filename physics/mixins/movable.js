import Vector from "../Vector";
import Line from "../../shapes/Line";
import { multiply, pow, divide } from "sjb-utils/Math";
import { MAP_WIDTH } from "../../config";

const movable = ({ mass, acceleration, elasticity }) => {
  return {
    velocity: Vector.of(0, 0),
    
    acceleration,

    mass,

    elasticity,

    get momentum() {
      return multiply(this.mass)(this.velocity.magnitude);
    },

    get kineticEnergy() {
      return multiply(1/2 * this.mass)(pow(this.velocity.magnitude)(2));
    },

    fall() {
      this.velocity = this.center.y < 500 
        ? this.velocity.add(Vector.of(multiply(1 / 2)(Math.PI), 0.5)) 
        : this.velocity;

      return this;
    },

    move() {
      const { velocity } = this;
      const { magnitude, direction } = velocity;
      this.center = this.center.addVector(velocity);
      this.center.y = this.center.y > 500 ? 500 : this.center.y;
      const outOfBounds = this.center.x < 0 || this.center.x > MAP_WIDTH;
      let newVec = Vector.of(direction, multiply(magnitude)(0.97));
      if (outOfBounds) {
        if (this.center.x < 0) {
          newVec = newVec.add(Vector.of(0, 1));
        } else {
          newVec = Vector.of(Math.PI, newVec.magnitude); // this doesn't work for some reaason
        }
      }
      this.velocity = newVec;
      return this;
    },

    accelerate() {
      this.velocity = this.velocity.add(Vector.of(0, this.acceleration));
      return this;
    },

    decelerate() {
      this.velocity = this.velocity.add(Vector.of(Math.PI, this.acceleration));
      return this;
    },

    collide(other, vec) {
      const { elasticity: e1, mass: m1, velocity: v1 } = this;
      const { elasticity: e2, mass: m2, velocity: v2 } = other;
      
      const mag1 = divide(
        e1 * m2 * (v2.magnitude - v1.magnitude) + (m1 * v1.magnitude) + (m2 * v2.magnitude)
      )(m1 + m2);

      const mag2 = divide(
        e2 * m1 * (v1.magnitude - v2.magnitude) + (m1 * v1.magnitude) + (m2 * v2.magnitude)
      )(m1 + m2);

      //const direction = vector.direction;
      //const d1 = Math.abs(invVec.direction - direction);
      //const d2 = Math.abs(vec.direction - direction);
      //const vec1 = d1 > d2 ? invVec : vec;
      //const vec2 = d1 > d2 ? vec : invVec;
      const d = Line(this.center, other.center).length;
      let vector = Vector.of(
        Math.atan2(other.center.y - this.center.y, other.center.x - this.center.x),
        d
      );
      let invVec = vector.inverse();
      invVec.magnitude = mag1;
      vector.magnitude = mag2;
      this.velocity = invVec;
      other.velocity = vector;
      this.move();
      other.move();
      return this;
    }
  }
};

export default movable;
