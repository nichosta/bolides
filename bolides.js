/* jshint esversion: 6, loopfunc: true, unused: false, strict: true, debug: true, globalstrict: true, moz: true, browser: true, devel: true, undef: true */
/* globals Asteroid, Bullet*/
'use strict';

const canvas = {
    element: document.getElementById('canvas'),
    ctx: '',
    drawAngled: function(obj, img) {
        canvas.ctx.save();
        canvas.ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
        canvas.ctx.rotate(obj.angle);
        canvas.ctx.drawImage(img, -obj.width / 2, -obj.height / 2, obj.width, obj.height);
        canvas.ctx.restore();
    }
};
// I'll write circular collisions later, I guess.
const collisions = {
    // For now you just get square collisions
    squareCollision: function(obj1, obj2) {
        return (
            obj1.x + obj1.width >= obj2.x &&
            obj1.x <= obj2.x + obj2.width &&
            obj1.y <= obj2.y + obj2.height &&
            obj1.y + obj1.height >= obj2.y
        );
    }
}

// KeyPress object for storing keypresses
var keyPresses = {
    up: false,
    down: false,
    left: false,
    right: false,
};

// Game object
var bolides = {
    // Self explanatory
    level: 1,
    score: 0,
    // Pause variable
    paused: false,

    // Interval object to store interval ids
    intervals: {
        slowdownInterval: 0,
        controlInterval: 0,
        // Whatever you do, don't blink. Blink and you're dead.
        blinkInterval: 0
    },
    // Attributes of the player's ship declared
    spaceship: {
        // Starting x and y
        x: 390,
        y: 290,
        // Starting angle
        angle: 0,
        // Starting velocity
        velocity: {
            x: 0,
            y: 0
        },
        // Constant width and height
        width: 32,
        height: 74,
        // Starting health
        hearts: 3,
        // Invincibilty and blink variables
        isVulnerable: true,
        isBlinking: false
    },
    // Images used by the project are created here
    images: {
        ship: document.createElement('img'),
        asteroid: document.createElement('img'),
        heart: document.createElement('img'),
        bullet: document.createElement('img'),
        bolide: document.createElement('img'),
    },
    /*
        // This function is for asteroid / spaceship collisions
        isTouchingSpaceship: function(spaceship, asteroid) {
            return (Math.pow(Math.abs(spaceship.x + 18 - (asteroid.x + 31)), 2) + Math.pow(Math.abs(spaceship.y + 31 - (asteroid.y + 31)), 2) <= 1300);
        },
        */
    // Function for slowing down spaceship
    slowdown: function() {
        if (bolides.spaceship.velocity.x > 0.5 && !keyPresses.up) {
            bolides.spaceship.velocity.x -= 0.5;
        } else if (bolides.spaceship.velocity.x <= -0.5 && !keyPresses.up) {
            bolides.spaceship.velocity.x += 0.5;
        } else if (bolides.spaceship.velocity.x < 0.5 && bolides.spaceship.velocity.x > -0.5 && !keyPresses.up) {
            bolides.spaceship.velocity.x = 0;
        }
        if (bolides.spaceship.velocity.y > 0.5 && !keyPresses.up) {
            bolides.spaceship.velocity.y -= 0.5;
        } else if (bolides.spaceship.velocity.y <= -0.5 && !keyPresses.up) {
            bolides.spaceship.velocity.y += 0.5;
        } else if (bolides.spaceship.velocity.y < 0.5 && bolides.spaceship.velocity.y > -0.5 && !keyPresses.up) {
            bolides.spaceship.velocity.y = 0;
        }
    },
    blink: function() {
        if (!bolides.spaceship.isVulnerable && bolides.spaceship.isBlinking) {
            bolides.spaceship.isBlinking = false;
        } else if (!bolides.spaceship.isVulnerable && !bolides.spaceship.isBlinking) {
            bolides.spaceship.isBlinking = true;
        } else if (bolides.spaceship.isVulnerable && bolides.spaceship.isBlinking) {
            bolides.spaceship.isBlinking = false;
        }
    },
    gameOver: function() {
        // Clear the screen
        bolides.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        // Set the game over menu style
        bolides.ctx.font = '48px Arcade';
        bolides.ctx.fillStyle = 'white';
        // Draw the game over s
        bolides.ctx.fillText('Game Over', window.innerWidth / 2 - window.innerWidth / 6, window.innerHeight / 2 - 50);
        // All this code was done on an 11-inch Macbook, so it probably looks awful on other computers.
        // Oh well.
        bolides.ctx.fillRect(window.innerWidth / 2 - window.innerWidth / 6, window.innerHeight / 2 - 26, 420, 60);
        bolides.ctx.fillStyle = 'black';
        // Draw the restart button
        bolides.ctx.fillText('Restart', window.innerWidth / 2 - window.innerWidth / 6 + 30, window.innerHeight / 2 + 25);
        addEventListener('click', function(e) {
            if (((window.innerWidth / 2 - window.innerWidth / 6 < e.clientX) && (e.clientX < window.innerWidth / 2 - window.innerWidth / 6 + 420)) && ((window.innerHeight / 2 - 26 < e.clientY) && (e.clientY < window.innerHeight / 2 + 34))) {
                // Basically reloads the page
                window.location = window.location;
            }
        });
        // Draw in the final level and score
        bolides.ctx.fillStyle = 'white';
        bolides.ctx.fillText('Score: ' + bolides.score, window.innerWidth / 2 - window.innerWidth / 6, window.innerHeight / 2 + 90);
        bolides.ctx.fillText('Level: ' + bolides.level, window.innerWidth / 2 - window.innerWidth / 6, window.innerHeight / 2 + 150);

        // Remove all the intervals from the game
        // I'm not sure this actually matters, I just wanted to be thorough.
        clearInterval(bolides.intervals.slowdownInterval);
        clearInterval(bolides.intervals.controlInterval);
        clearInterval(bolides.intervals.blinkInterval);

        // Reruns the program every time the window gets resized
        // This makes sure the whole thing looks nice all the time
        addEventListener('resize', bolides.gameOver);
    },

    // Pause function
    // Handles both pausing and unpausing
    pause: function() {
        // Unpausing
        if (bolides.paused) {
            bolides.paused = false;
            bolides.intervals.controlInterval = setInterval(bolides.control, 100);
            bolides.intervals.slowdownInterval = setInterval(bolides.slowdown, 500);
            requestAnimationFrame(bolides.loop);
            // Pausing
        } else if (!bolides.paused) {
            bolides.paused = true;
            // I get rid of the control interval so you can't move while it's paused
            clearInterval(bolides.intervals.controlInterval);
            clearInterval(bolides.intervals.slowdownInterval);
        }
    },
    // Loop
    loop: function() {
        // Is the player out of health?
        if (bolides.spaceship.hearts <= 0) {
            // Then display 'Game over'
            bolides.gameOver();
        } else {
            // No? Then move and draw everything, then loop again.
            // PS: also resize the canvas, just in case
            canvas.element.width = window.innerWidth - 4;
            canvas.element.height = window.innerHeight - 4;
            bolides.move();
            bolides.draw();
            // Get the next frame
            if (!bolides.paused) {
                requestAnimationFrame(bolides.loop);
            }
        }
    },
    control: function() {
        // Up key or W key?
        // Does several formulas to make sure you can speed up (there's a max speed)
        // This is real ugly
        if (keyPresses.up) {
            if (bolides.spaceship.velocity.x > 10) {
                if (Math.sin(bolides.spaceship.angle) < 0) {
                    bolides.spaceship.velocity.x += Math.sin(bolides.spaceship.angle);
                }
            }
            if (bolides.spaceship.velocity.y > 10) {
                if (-Math.cos(bolides.spaceship.angle) < 0) {
                    bolides.spaceship.velocity.y += -Math.cos(bolides.spaceship.angle);
                }
            }
            if (bolides.spaceship.velocity.x < -10) {
                if (Math.sin(bolides.spaceship.angle) > 0) {
                    bolides.spaceship.velocity.x += Math.sin(bolides.spaceship.angle);
                }
            }
            if (bolides.spaceship.velocity.y < -10) {
                if (-Math.cos(bolides.spaceship.angle) > 0) {
                    bolides.spaceship.velocity.y += -Math.cos(bolides.spaceship.angle);
                }
            }
            if ((bolides.spaceship.velocity.x > -10 && bolides.spaceship.velocity.x < 10) && (bolides.spaceship.velocity.y > -10 && bolides.spaceship.velocity.y < 10)) {
                bolides.spaceship.velocity.x += Math.sin(bolides.spaceship.angle);
                bolides.spaceship.velocity.y += -Math.cos(bolides.spaceship.angle);
            }
        }
        // Down key does nothing, atm (may change), but still has a handler
        // Left key or A key?
        if (keyPresses.left) {
            // Then change its angle by 20 degrees over 1/10 second
            // This animation (and the other one, below) is added to smoothen turning
            var leftInterval = setInterval(() => bolides.spaceship.angle -= (Math.PI / 180) * 6, 20);
            setTimeout(() => clearInterval(leftInterval), 100);
        }
        // Right key or D key?
        if (keyPresses.right) {
            var rightInterval = setInterval(() => bolides.spaceship.angle += (Math.PI / 180) * 6, 20);
            setTimeout(() => clearInterval(rightInterval), 100);
        }
    },

    move: function() { // Not just moving, more like "logic()"
        // Level up
        if (bolides.level * 100 <= bolides.score) {
            // Remove score
            bolides.score = 0;
            // Increase level
            bolides.level++;
            // Create a new asteroid
            bolides.asteroidList.push(new Asteroid());
        }
        // Ship Math
        bolides.spaceship.x += bolides.spaceship.velocity.x;
        bolides.spaceship.y += bolides.spaceship.velocity.y;
        // Side warps
        if (bolides.spaceship.x <= -25) {
            bolides.spaceship.x = window.innerWidth;
        } else if (bolides.spaceship.x >= window.innerWidth) {
            bolides.spaceship.x = 0;
        }
        if (bolides.spaceship.y >= window.innerHeight + 30) {
            bolides.spaceship.y = 0;
        } else if (bolides.spaceship.y <= -30) {
            bolides.spaceship.y = window.innerHeight;
        }
        // If accelerating
        if (keyPresses.up && bolides.spaceship.isVulnerable) {
            // Use the moving ship pic.
            bolides.images.ship.src = 'images/spaceship-move.png';
        } else {
            bolides.images.ship.src = 'images/spaceship.png';
        }
        bolides.bulletList.forEach((bullet, index) => {
            // Stop bullet
            if (!bullet.isBeingFired) {
                bullet.x = window.innerWidth - 65 + (15 * index);
                bullet.y = 35;
                bullet.angle = 0;
                bullet.speed = 10;
                bullet.isCooling = false;
            } else {
                // Bullet movement math
                bullet.direction.x = Math.sin(bullet.angle);
                bullet.direction.y = -Math.cos(bullet.angle);
                bullet.x += bullet.direction.x * bullet.speed;
                bullet.y += bullet.direction.y * bullet.speed;
            }
            // Bullet cooldown times
            if ((bullet.x <= -25 || bullet.x >= window.innerWidth) && !bullet.isCooling) {
                bullet.isCooling = true;
                setTimeout(() => bullet.isBeingFired = false, 1000);
            }
            if ((bullet.y >= window.innerHeight || bullet.y <= -30) && !bullet.isCooling) {
                bullet.isCooling = true;
                setTimeout(() => bullet.isBeingFired = false, 1000);
            }
        });
        // Asteroid movement math
        // Dynamic number of asteroids => Use forEach on asteroid list
        // Fun fact: At least 5 times while coding this, I encountered a bug due to typing 'asteroid' as 'asteriod'
        // Also 'bolides' as 'boldies' or 'boildes'
        // Anyway, a good chunk of this math is exactly the same as what the spaceship has.
        bolides.asteroidList.forEach((asteroid) => {
            // Choose where the asteroid comes from, its angle, and whether or not it's a bolide.
            if (!asteroid.isInMotion) {
                asteroid.isBolide = Math.random() < 0.05; // 5% or 1/20 chance
                if (Math.random() < 0.5) {
                    asteroid.x = (Math.random() * (window.innerWidth + 100) + 50);
                    asteroid.y = -50;
                    asteroid.angle = Math.random() * 2.9670597283903604 + 1.6580627893946132; // Radians or something
                } else {
                    asteroid.x = window.innerWidth + 50;
                    asteroid.y = Math.random() * (window.innerHeight - 50) + 50;
                    asteroid.angle = Math.random() * 2.9670597283903604 + 3.2288591161895095; // I don't even remember what these numbers were supposed to be
                }
                asteroid.isInMotion = true;
            }

            asteroid.height = asteroid.isBolide ? 154 : 62;
            asteroid.direction.x = Math.sin(asteroid.angle);
            asteroid.direction.y = -Math.cos(asteroid.angle);
            asteroid.x += asteroid.direction.x * asteroid.speed;
            asteroid.y += asteroid.direction.y * asteroid.speed;
            // Asteroid stopping
            if (asteroid.x <= -60 || asteroid.x >= window.innerWidth + 60 || asteroid.y >= window.innerHeight + 60 || asteroid.y <= -50)
                asteroid.isInMotion = false;
        });
        // Collision detection (spaceship x asteroid)
        bolides.asteroidList.forEach((asteroid) => {
            if (collisions.squareCollision(bolides.spaceship, asteroid) && bolides.spaceship.isVulnerable) {
                bolides.spaceship.hearts--;
                bolides.spaceship.x = window.innerWidth / 2 - 18;
                bolides.spaceship.y = window.innerHeight / 2 - 31;
                bolides.spaceship.isVulnerable = false;
                setTimeout(() => bolides.spaceship.isVulnerable = true, 3000);
            }
        });
        // Collision detection (bullets x asteroid)
        bolides.bulletList.forEach((bullet) => {
            bolides.asteroidList.forEach((asteroid) => {
                if (collisions.squareCollision(bullet, asteroid) && bullet.isBeingFired) {
                    asteroid.isInMotion = false;
                    bullet.isBeingFired = false;
                    bolides.score += asteroid.isBolide ? 500 : 100;
                }
            });
        });
    },

    // The whole drawing function
    draw: function() {
        // Clear the canvas
        canvas.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        // HUD Style
        canvas.ctx.fillStyle = 'white';
        canvas.ctx.font = '24px Arcade';
        // Draw level word
        canvas.ctx.fillText('Level: ' + bolides.level, 10, window.innerHeight - 20);
        // Draw score
        canvas.ctx.fillText('Score: ' + bolides.score, window.innerWidth - 250, window.innerHeight - 20);
        // Check for the number of hearts and draw that many
        for (var i = 1; i <= bolides.spaceship.hearts; i++)
            canvas.drawAngled({ x: (i - 1) * 30 + 5, y: 15, width: 38, height: 34, angle: 0 }, bolides.images.heart);
        // Draw out every asteroid, choosing whether to use the bolide image
        bolides.asteroidList.forEach((asteroid) => {
            canvas.drawAngled(asteroid, asteroid.isBolide ? bolides.images.bolide : bolides.images.asteroid);
        });
        // Draw the bullets
        bolides.bulletList.forEach((bullet) => {
            canvas.drawAngled(bullet, bolides.images.bullet);
        });
        // Spaceship last so it gets drawn over other things
        if (!bolides.spaceship.isBlinking)
            canvas.drawAngled(bolides.spaceship, bolides.images.ship);
    }
}