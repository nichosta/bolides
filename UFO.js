var UFO = function(bullet) {
  this.reset();
  this.bullet = bullet;
};
UFO.prototype.reset = function() {
  // Coordinates
  this.x = 100;
  this.y = 100;
  // Direction
  this.direction = 0;
  // Speed
  this.speed = 0;
};
