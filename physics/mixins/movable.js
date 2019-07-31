import Vector from "../Vector";
import Line from "../../shapes/Line";
import { multiply } from "sjb-utils/Math";

const movable = ({ mass, acceleration, elasticity }) => {
  return {
    velocity: Vector.of(0, 0),
    
    acceleration,

    mass,

    get momentum() {
      return multiply(this.mass)(this.velocity.magnitude);
    },

    fall() {
      this.velocity = this.center.y < 500 
        ? this.velocity.add(Vector.of(multiply(1 / 2)(Math.PI), 1)) 
        : this.velocity;

      return this;
    },

    move() {
      const { velocity } = this;
      this.center = this.center.addVector(velocity);
      this.center.y = this.center.y > 500 ? 500 : this.center.y;
      this.velocity.magnitude = multiply(this.velocity.magnitude)(0.98);
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
      
      //const direction = vector.direction;
      //const d1 = Math.abs(invVec.direction - direction);
      //const d2 = Math.abs(vec.direction - direction);
      //const vec1 = d1 > d2 ? invVec : vec;
      //const vec2 = d1 > d2 ? vec : invVec;
      let vector = Line(this.center, other.center).toVector();
      let invVec = vector.inverse();
      //vec1.magnitude = this.velocity.magnitude;
      //vec2.magnitude = other.velocity.magnitude;
      vector.magnitude = this.velocity.magnitude;
      invVec.magnitude = other.velocity.magnitude;
      this.velocity = vector;
      other.velocity = invVec;
      this.move();
      other.move();
      return this;
    }
  }
};

export default movable;
