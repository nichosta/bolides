/*jshint globals: false, unused: false, strict: false, debug: true, globalstrict: true, moz: true, browser: true, devel: true, jquery: true*/
var bolides = {
    canvas: {
        ctx: ''
    },
    // Attributes of the player's ship declared
    spaceship: {
        // Starting x and y
        x: 390,
        y: 290,
        // Starting speed
        speed: 0,
        // Starting angle
        angle: 0,
        // Starting direction
        direction: {
            x: 0,
            y: 0
        },
        // Starting health
        hearts: 3
    },
    // Attributes of the asteroids declared
    asteriod: {
        // Same attributes as the ship, aside from pos
        x: Math.floor(Math.random() * 50 + 800),
        y: Math.floor(Math.random() * 600 + 20),
        angle: 0,
        direction: {
            x: 0,
            y: 0
        },
        speed: 5
    },
    // Oh snap, Spaceship's got a gun! (1st one)
    bullet1 : {
        // Coordinates
        x: 0,
        y: 0,
        // Speed depends on Spaceship's speed, btw.
        speed: 10,
        // Angle is spaceship's angle until fired
        angle: 0,
        // Direction stuff again! How advanced!
        direction: {
            x: 0,
            y: 0
        },
        // Is what it says on the tin
        isBeingFired: false,
        // Shooty gun
        fire: function() {
            bolides.bullet1.isBeingFired = true;
            bolides.bullet1.x = bolides.spaceship.x;
            bolides.bullet1.y = bolides.spaceship.y;
            bolides.bullet1.angle = bolides.spaceship.angle;
            bolides.bullet1.speed += bolides.spaceship.speed;
        }
    },
    // Oh snap, Spaceship's got a gun! (2st one)
    bullet2 : {
        // Coordinates
        x: 0,
        y: 0,
        // Speed depends on Spaceship's speed, btw.
        speed: 10,
        // Angle is spaceship's angle until fired
        angle: 0,
        // Direction stuff again! How advanced!
        direction: {
            x: 0,
            y: 0
        },
        // Is what it says on the tin
        isBeingFired: false,
        // Shooty gun
        fire: function() {
            bolides.bullet2.isBeingFired = true;
            bolides.bullet2.x = bolides.spaceship.x;
            bolides.bullet2.y = bolides.spaceship.y;
            bolides.bullet2.angle = bolides.spaceship.angle;
            bolides.bullet2.speed += bolides.spaceship.speed;
        }
    },
    // Oh snap, Spaceship's got a gun! (3st one)
    bullet3 : {
        // Coordinates
        x: 0,
        y: 0,
        // Speed depends on Spaceship's speed, btw.
        speed: 10,
        // Angle is spaceship's angle until fired
        angle: 0,
        // Direction stuff again! How advanced!
        direction: {
            x: 0,
            y: 0
        },
        // Is what it says on the tin
        isBeingFired: false,
        // Shooty gun
        fire: function() {
            bolides.bullet3.isBeingFired = true;
            bolides.bullet3.x = bolides.spaceship.x;
            bolides.bullet3.y = bolides.spaceship.y;
            bolides.bullet3.angle = bolides.spaceship.angle;
            bolides.bullet3.speed += bolides.spaceship.speed;
        }
    },
    // Images used by the project are created here
    images: {
        ship: document.createElement('img'),
        asteroid: document.createElement('img'),
        heart: document.createElement('img'),
        bullet: document.createElement("img")
    },
    initiate: function(){
        // Declare the canvas's context as 2D
        var canva = document.getElementById('canvas');
        bolides.canvas.ctx = canva.getContext('2d');
        // EventListener for keypresses to change speed and stuff
        addEventListener('keydown', function(e){bolides.control(e);});
        // Interval for slowdown
        setInterval(function(){ if(bolides.spaceship.speed > 0) {bolides.spaceship.speed -= 0.5;}}, 500);
        // Set the image sources
        bolides.images.ship.setAttribute('src', "../bolides/images/spaceship.png");
        bolides.images.asteroid.setAttribute('src', "../bolides/images/asteroid.png");
        bolides.images.heart.setAttribute('src', "../bolides/images/heart.png");
        bolides.images.bullet.setAttribute('src', "../bolides/images/bullet.png");
        // Start looping
        bolides.loop();
    },
    loop: function() {
        // Is the player out of health?
        if(bolides.spaceship.hearts === 0) {
            // Then display "Game over"
            bolides.canvas.ctx.clearRect(0, 0, 800, 600);
            bolides.canvas.ctx.font = "48px Ubuntu";
            bolides.canvas.ctx.fillStyle = "white";
            bolides.canvas.ctx.fillText("Game Over", 200, 200);
        } else {
            // No? Then move and draw everything, then loop again.
            bolides.move();
            bolides.draw();
            requestAnimationFrame(function() { bolides.loop(); });
        }
    },
    control: function(key) {
        // Up key or W key?
        if (key.keyCode === 38 || key.keyCode === 87) {
            // Then increase speed if not past terminal velocity
            if (bolides.spaceship.speed < 25) {
            bolides.spaceship.speed += 1;
            }
        // Down key or S key?
        } else if (key.keyCode === 40 || key.keyCode === 83) {
            // Then decrease speed.
            if (bolides.spaceship.speed > 0){
            bolides.spaceship.speed -= 1;
            }
        // R key?
        } else if (key.keyCode === 82) {
            // Then remove a heart.
            bolides.spaceship.hearts -= 1;
        // Left key or A key?
        } else if (key.keyCode === 37 || key.keyCode === 65) {
            // Then change its angle by 7.5 degrees
            bolides.spaceship.angle -= 0.1308996938995747;
        // Right key or D key?
        } else if (key.keyCode === 39 || key.keyCode === 68) {
            // Then change its angle by -7.5 degrees
            bolides.spaceship.angle += 0.1308996938995747;
        // Space bar or Q key?
        } else if (key.keyCode === 32 || key.keyCode === 81) {
            if (!bolides.bullet1.isBeingFired) {
                bolides.bullet1.fire();
            } else if (!bolides.bullet2.isBeingFired) {
                bolides.bullet2.fire();
            } else if (!bolides.bullet3.isBeingFired) {
                bolides.bullet3.fire();
            }
        }
    },
    move: function() {
        // Ship Math
        bolides.spaceship.direction.x = Math.sin(bolides.spaceship.angle);
        bolides.spaceship.direction.y = -Math.cos(bolides.spaceship.angle);
        bolides.spaceship.x += bolides.spaceship.direction.x * bolides.spaceship.speed;
        bolides.spaceship.y += bolides.spaceship.direction.y * bolides.spaceship.speed;
        // Side warps
        if (bolides.spaceship.x <= -25){
            bolides.spaceship.x = 800;
        } else if (bolides.spaceship.x >=800) {
            bolides.spaceship.x = 0;
        }
        if (bolides.spaceship.y >= 630) {
            bolides.spaceship.y = 0;
        } else if (bolides.spaceship.y <= 0) {
            bolides.spaceship.y = 600;
        }
        // If it's moving,
        if (bolides.spaceship.speed !== 0) {
            // Use the moving ship pic.
            bolides.images.ship.setAttribute('src', "../bolides/images/spaceship-move.png");
        // Elsewise, don't.
        } else {
            bolides.images.ship.setAttribute('src', "../bolides/images/spaceship.png");
        }
        // Stop bullet 1
        if (!bolides.bullet1.isBeingFired) {
            bolides.bullet1.x = 750;
            bolides.bullet1.y = 35;
            bolides.bullet1.angle = 0;
            bolides.bullet1.speed = 10;
        } else {
        // Bullet math 1
        bolides.bullet1.direction.x = Math.sin(bolides.bullet1.angle);
        bolides.bullet1.direction.y = -Math.cos(bolides.bullet1.angle);
        bolides.bullet1.x += bolides.bullet1.direction.x * bolides.bullet1.speed;
        bolides.bullet1.y += bolides.bullet1.direction.y * bolides.bullet1.speed;
        }
        // Stop bullet 2
        if (!bolides.bullet2.isBeingFired) {
            bolides.bullet2.x = 765;
            bolides.bullet2.y = 35;
            bolides.bullet2.angle = 0;
            bolides.bullet2.speed = 10;
        } else {
        // Bullet math 2
        bolides.bullet2.direction.x = Math.sin(bolides.bullet2.angle);
        bolides.bullet2.direction.y = -Math.cos(bolides.bullet2.angle);
        bolides.bullet2.x += bolides.bullet2.direction.x * bolides.bullet2.speed;
        bolides.bullet2.y += bolides.bullet2.direction.y * bolides.bullet2.speed;
        }
        // Stop bullet 3
        if (!bolides.bullet3.isBeingFired) {
            bolides.bullet3.x = 780;
            bolides.bullet3.y = 35;
            bolides.bullet3.angle = 0;
            bolides.bullet3.speed = 10;
        } else {
        // Bullet math 3
        bolides.bullet3.direction.x = Math.sin(bolides.bullet3.angle);
        bolides.bullet3.direction.y = -Math.cos(bolides.bullet3.angle);
        bolides.bullet3.x += bolides.bullet3.direction.x * bolides.bullet3.speed;
        bolides.bullet3.y += bolides.bullet3.direction.y * bolides.bullet3.speed;
        }
        // Because decimals
        if ((bolides.spaceship.speed > 0) && (bolides.spaceship.speed < 0.5)) {
            bolides.spaceship.speed = 0;
        } else if (bolides.spaceship.speed < 0) {
            bolides.spaceship.speed = 0;
        }
        // 1st Bullet dissipation and cooldown
        if (bolides.bullet1.x <= -25){
            setTimeout(function() { bolides.bullet1.isBeingFired = false;}, 1500);
        } else if (bolides.bullet1.x >=800) {
            setTimeout(function() { bolides.bullet1.isBeingFired = false;}, 1500);
        }
        if (bolides.bullet1.y >= 630) {
            setTimeout(function() { bolides.bullet1.isBeingFired = false;}, 1500);
        } else if (bolides.bullet1.y <= 0) {
            setTimeout(function() { bolides.bullet1.isBeingFired = false;}, 1500);
        }
        // 2nd Bullet dissipation cooldown
        if (bolides.bullet2.x <= -25){
            setTimeout(function() { bolides.bullet2.isBeingFired = false;}, 1500);
        } else if (bolides.bullet1.x >=800) {
            setTimeout(function() { bolides.bullet2.isBeingFired = false;}, 1500);
        }
        if (bolides.bullet2.y >= 630) {
            setTimeout(function() { bolides.bullet2.isBeingFired = false;}, 1500);
        } else if (bolides.bullet2.y <= 0) {
            setTimeout(function() { bolides.bullet2.isBeingFired = false;}, 1500);
        }
        // 3rd Bullet dissipation cooldown
        if (bolides.bullet3.x <= -25){
            setTimeout(function() { bolides.bullet3.isBeingFired = false;}, 1500);
        } else if (bolides.bullet3.x >=800) {
            setTimeout(function() { bolides.bullet3.isBeingFired = false;}, 1500);
        }
        if (bolides.bullet3.y >= 630) {
            setTimeout(function() { bolides.bullet3.isBeingFired = false;}, 1500);
        } else if (bolides.bullet3.y <= 0) {
            setTimeout(function() { bolides.bullet3.isBeingFired = false;}, 1500);
        }
    },
    draw: function() {
        // Clear the canvas
        bolides.canvas.ctx.clearRect(0, 0, 800, 600);
        // Save it so I can f*** about as much as I want
        bolides.canvas.ctx.save();
        // Set the origin to the ship's center
        bolides.canvas.ctx.translate(bolides.spaceship.x + 18, bolides.spaceship.y - 31);
        // Rotate the ship around the center by the angle of the ship
        bolides.canvas.ctx.rotate(bolides.spaceship.angle);
        // Draw the ship
        bolides.canvas.ctx.drawImage(bolides.images.ship, -18, -31, 36, 62);
        // Restore all f***ing about
        bolides.canvas.ctx.restore();
        // Oh boy more saving
        bolides.canvas.ctx.save();
        // Set the origin to the bullet's origin
        bolides.canvas.ctx.translate(bolides.bullet1.x + 3, bolides.bullet1.y - 12.5);
        // Rotate the canvas
        bolides.canvas.ctx.rotate(bolides.bullet1.angle);
        // Fastest draw in the west
        bolides.canvas.ctx.drawImage(bolides.images.bullet, -3, -12.5);
        // Full Restore
        bolides.canvas.ctx.restore();
        // Repeat with all bullets
        bolides.canvas.ctx.save();
        bolides.canvas.ctx.translate(bolides.bullet2.x + 3, bolides.bullet2.y - 12.5);
        bolides.canvas.ctx.rotate(bolides.bullet2.angle);
        bolides.canvas.ctx.drawImage(bolides.images.bullet, -3, -12.5);
        bolides.canvas.ctx.restore();
        bolides.canvas.ctx.save();
        bolides.canvas.ctx.translate(bolides.bullet3.x + 3, bolides.bullet3.y - 12.5);
        bolides.canvas.ctx.rotate(bolides.bullet3.angle);
        bolides.canvas.ctx.drawImage(bolides.images.bullet, -3, -12.5);
        bolides.canvas.ctx.restore();
        // Draw the asteroid (doesn't turn up because it's off the screen)
        bolides.canvas.ctx.drawImage(bolides.images.asteroid, bolides.asteriod.x, bolides.asteriod.y);
        // HUD Style
        bolides.canvas.ctx.fillStyle = "white";
        bolides.canvas.ctx.font = "24px Ubuntu";
        // Draw Health word
        bolides.canvas.ctx.fillText("Health:", 10, 30);
        // Draw Ammo word
        bolides.canvas.ctx.fillText("Ammo:", 665, 30);
        // Draw speed words
        bolides.canvas.ctx.fillText("Speed: " + bolides.spaceship.speed, 10, 580);
        // Check for the number of hearts and draw that many
        if (bolides.spaceship.hearts >= 3) {
            bolides.canvas.ctx.drawImage(bolides.images.heart, 90, 15);
            bolides.canvas.ctx.drawImage(bolides.images.heart, 110, 15);
            bolides.canvas.ctx.drawImage(bolides.images.heart, 130, 15);
        } else if (bolides.spaceship.hearts === 2) {
            bolides.canvas.ctx.drawImage(bolides.images.heart, 90, 15);
            bolides.canvas.ctx.drawImage(bolides.images.heart, 110, 15);
        } else {
            bolides.canvas.ctx.drawImage(bolides.images.heart, 90, 15);
        }
    }
};
// Actually start the program
addEventListener('load', function() { bolides.initiate(); });
