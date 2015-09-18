var EvilBullet = function(ufo) {
    this.ufo = ufo;
    this.reset();
};

EvilBullet.prototype = {
    reset: function() {
        // Coordinates
        this.x = 0;
        this.y = 0;
        // Speed is a constant 10
        this.speed = 10;
        // Angle is UFO's angle until fired
        this.angle = 0;
        // Is what it says on the tin
        this.isBeingFired = false;
        // Cooldown
        this.isCooling = false;
    },

    // Shooty gun
    fire: function () {
        this.isBeingFired = true;
        this.x = this.ufo.x;
        this.y = this.ufo.y + 31;
        this.angle = this.ufo.angle;
        this.speed = 10;
    }
};
