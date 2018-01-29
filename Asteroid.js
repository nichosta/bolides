var Asteroid = function() {
    this.reset();
};
Asteroid.prototype = {
    reset: function() {
        // Same attributes as the ship, aside from pos
        this.x = 0;
        this.y = 0;
        this.angle = 0;
        this.direction = {
            x: 0,
            y: 0
        };
        this.width = 62;
        this.height = 62;
        this.speed = 5;
        this.isInMotion = false;
        this.isBolide = false;
    }
};