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
        this.speed = 10;
        // Angle is spaceship's angle until fired
        this.angle = 0;
        // Direction stuff again! How advanced!
        this.direction = {
            x: 0,
            y: 0
        };
        // Is what it says on the tin
        this.isBeingFired = false;
        // Cooldown
        this.isCooling = false;
    },

    // Shooty gun
    fire: function () {
        this.isBeingFired = true;
        this.x = this.spaceship.x;
        this.y = this.spaceship.y + 31;
        this.angle = this.spaceship.angle;
        this.speed = 10;
    }
};
