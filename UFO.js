var UFO = function(bullet) {
  this.reset();
  this.bullet = bullet;
};
UFO.prototype.reset = function() {
  // Coordinates
  this.x = 0;
  this.y = 0;
  // Direction
  this.direction = 0;
  // Speed
  this.speed = 0;
};
