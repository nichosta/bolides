var Asteroid = function() {
  this.reset()
}
Asteroid.prototype = {
  reset: function() {
        // Same attributes as the ship, aside from pos
        this.x = 0;
        this.y = 0;
        this.angle = 0;
        this.direction = {
            x: 0,
            y: 0
        },
        this.speed = 4;
        this.isInMotion = false;
        this.isBolide = false;
    }
  }
