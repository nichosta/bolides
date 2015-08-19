function isTouchingBullet(bullet, asteroid) {
  if (if (Math.pow(Math.abs(bullet.x - (asteroid.x + 31)), 2) + Math.pow(Math.abs(bullet.y - (asteroid.y + 31)), 2) <= 1050) {
      return true;
};
function isTouchingSpaceship(spaceship, asteroid) {
  if (if (Math.pow(Math.abs(spaceship.x - (asteroid.x + 31)), 2) + Math.pow(Math.abs(spaceship.y - (asteroid.y + 31)), 2) <= 1200) {
      return true;
};
