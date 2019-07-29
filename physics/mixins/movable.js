import Point from "../../shapes/Point";

const gravity = 0.01;

const movable = acceleration => {
  return {
    speed: {
      x: 0,
      y: 0
    },
    
    acceleration,

    fall() {
      this.speed.y += 1;
      return this;
    },

    move() {
      const { x, y } = this.center;
      const { speed } = this;
      this.center = Point(x + speed.x, y + speed.y);
      return this;
    },

    accelerate() {
      this.speed.x += this.acceleration;
      return this;
    },

    decelerate() {
      this.speed.x -= this.acceleration;
      return this;
    }
  }
};

export default movable;
