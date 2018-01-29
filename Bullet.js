var Bullet = function(spaceship) {
    this.spaceship = spaceship;
    this.reset();
};

Bullet.prototype = {
    reset: function() {
        // Coordinates
        this.x = 0;
        this.y = 0;
        // Speed depends on Spaceship's speed, btw.
        this.speed = 15;
        // Angle is spaceship's angle until fired
        this.angle = 0;
        this.direction = {
            x: 0,
            y: 0
        };
        this.width = 6;
        this.height = 23;
        // Is what it says on the tin
        this.isBeingFired = false;
        // Cooldown
        this.isCooling = false;
    },

    fire: function() {
        this.isBeingFired = true;
        this.x = this.spaceship.x;
        this.y = this.spaceship.y + 31;
        this.angle = this.spaceship.angle;
        this.speed = 10;
    }
};