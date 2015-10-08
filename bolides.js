/*jshint loopfunc: true, globals: false, unused: false, strict: false, debug: true, globalstrict: true, moz: true, browser: true, devel: true */
var bolides = {
    level: 0,
    score: 0,
    canva: 0,
    canvas: {
        ctx: ''
    },

    // Intervals to store interval ids
    intervals: {
        slowdownInterval: 0,
        controlInterval: 0,
        // Whatever you do, don't blink. Blink and you're dead.
        blinkInterval: 0
    },

    menu: {
      menu: document.getElementById("menu"),
      instructions: document.getElementById("instructions"),
      credits: document.getElementById("credits"),
      menustart: function() {
        document.getElementById("playButton").addEventListener('click', function() {
            bolides.initiate();
            menu.style.display = "none";
            document.getElementsByClassName('bolide')[0].style.display = 'none';
            document.getElementsByClassName('gitRibbon')[0].style.display = 'none';
          });

          document.getElementById("instructionsButton").addEventListener('click', function() {
            menu.style.display = "none";
            instructions.style.display = "block";
          });
          instructions.addEventListener("click", function() {
            menu.style.display = "block";
            instructions.style.display = "none";
          });
          document.getElementById("creditsButton").addEventListener('click', function() {
            menu.style.display = "none";
            credits.style.display = "block";
          });
          credits.addEventListener("click", function() {
            menu.style.display = "block";
            credits.style.display = "none";
      });
    }
    },
    // KeyPress object for storing keypresses
    keyPresses: {
        up: false,
        w: false,
        a: false,
        s: false,
        d: false,
        down: false,
        left: false,
        right: false,
        r: false
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
        // Starting health
        hearts: 3,
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
        ufo: document.createElement('img'),
        ufobullet: document.createElement('img')
    },

    createBullets: function() {
        // Oh snap, Spaceship's got a gun!
        bolides.bullet1 = new Bullet(bolides.spaceship);
        bolides.bullet2 = new Bullet(bolides.spaceship);
        bolides.bullet3 = new Bullet(bolides.spaceship);
        bolides.bulletList = [bolides.bullet1, bolides.bullet2, bolides.bullet3];
    },

    createAsteroids: function() {
        bolides.asteroid1 = new Asteroid();
        bolides.asteroid2 = new Asteroid();
        bolides.asteroid3 = new Asteroid();
        bolides.asteroidList = [bolides.asteroid1, bolides.asteroid2, bolides.asteroid3];
    },

    createEvilBullets: function() {
      bolides.evilBullet1 = new EvilBullet();
      bolides.evilBullet2 = new EvilBullet();
      bolides.evilBullet3 = new EvilBullet();
      bolides.evilBulletList = [bolides.evilBullet1, bolides.evilBullet2, bolides.evilBullet3];
    },

    createUFOs: function() {
      bolides.ufo1 = new UFO(bolides.evilBullet1);
      bolides.ufo2 = new UFO(bolides.evilBullet2);
      bolides.ufo3 = new UFO(bolides.evilBullet3);
      bolides.ufoList = [bolides.ufo1, bolides.ufo2, bolides.ufo3];
    },

    isTouchingBullet: function(bullet, asteroid) {
      if (((Math.pow(Math.abs(bullet.x - (asteroid.x + 31)), 2)) + (Math.pow(Math.abs(bullet.y - (asteroid.y + 31)), 2)) <= 1050) && bullet.isBeingFired) {
          return true;
      }
      else {
        return false;
      }
    },
    isTouchingSpaceship: function(spaceship, asteroid) {
      if (Math.pow(Math.abs(spaceship.x - (asteroid.x + 31)), 2) + Math.pow(Math.abs(spaceship.y - (asteroid.y + 31)), 2) <= 1200) {
          return true;
      }
      else {
        return false;
      }
    },

    initiate: function () {
        // Declare the canvas's context as 2D
        bolides.canva = document.getElementById('canvas');
        bolides.canvas.ctx = bolides.canva.getContext('2d');

        // Set the canvas's size
        bolides.canva.width = window.innerWidth - 4;
        bolides.canva.height = window.innerHeight - 4;

        // Create assets
        bolides.createBullets();
        bolides.createAsteroids();

        // Keydown listeners
        addEventListener('keydown', function(e) {
            if (e.keyCode === 87) {
                bolides.keyPresses.w = true;
            }
            if (e.keyCode === 65) {
                bolides.keyPresses.a = true;
            }
            if (e.keyCode === 83) {
                bolides.keyPresses.s = true;
            }
            if (e.keyCode === 68) {
                bolides.keyPresses.d = true;
            }
            if (e.keyCode === 38) {
                bolides.keyPresses.up = true;
            }
            if (e.keyCode === 37) {
                bolides.keyPresses.left = true;
            }
            if (e.keyCode === 40) {
                bolides.keyPresses.down = true;
            }
            if (e.keyCode === 39) {
                bolides.keyPresses.right = true;
            }
            if (e.keyCode === 32) {
                  if (!bolides.bullet1.isBeingFired) {
                      bolides.bullet1.fire();
                  } else if (!bolides.bullet2.isBeingFired) {
                      bolides.bullet2.fire();
                  } else if (!bolides.bullet3.isBeingFired) {
                      bolides.bullet3.fire();
                  }
            }
            if (e.keyCode === 82) {
                bolides.keyPresses.r = true;
            }
        });

        // Keyup listeners
        addEventListener('keyup', function(e) {
            if (e.keyCode === 87) {
                bolides.keyPresses.w = false;
            }
            if (e.keyCode === 65) {
                bolides.keyPresses.a = false;
            }
            if (e.keyCode === 83) {
                bolides.keyPresses.s = false;
            }
            if (e.keyCode === 68) {
                bolides.keyPresses.d = false;
            }
            if (e.keyCode === 38) {
                bolides.keyPresses.up = false;
            }
            if (e.keyCode === 37) {
                bolides.keyPresses.left = false;
            }
            if (e.keyCode === 40) {
                bolides.keyPresses.down = false;
            }
            if (e.keyCode === 39) {
                bolides.keyPresses.right = false;
            }
            if (e.keyCode === 82) {
                bolides.keyPresses.r = false;
            }
        });
        // Set the spaceship slowdown interval
        bolides.intervals.slowdownInterval = setInterval(function() {
          if (bolides.spaceship.velocity.x > 0.5 && !bolides.keyPresses.w && !bolides.keyPresses.up) {
            bolides.spaceship.velocity.x -= 0.5;
          } else if (bolides.spaceship.velocity.x < -0.5 && !bolides.keyPresses.w && !bolides.keyPresses.up) {
            bolides.spaceship.velocity.x += 0.5;
          } else if (bolides.spaceship.velocity.x < 0.5 && bolides.spaceship.velocity.x > -0.5 && !bolides.keyPresses.w && !bolides.keyPresses.up) {
            bolides.spaceship.velocity.x = 0;
          }
          if (bolides.spaceship.velocity.y > 0.5 && !bolides.keyPresses.w && !bolides.keyPresses.up) {
            bolides.spaceship.velocity.y -= 0.5;
          } else if (bolides.spaceship.velocity.y < -0.5 && !bolides.keyPresses.w && !bolides.keyPresses.up) {
            bolides.spaceship.velocity.y += 0.5;
          } else if (bolides.spaceship.velocity.y < 0.5 && bolides.spaceship.velocity.y > -0.5 && !bolides.keyPresses.w && !bolides.keyPresses.up) {
            bolides.spaceship.velocity.y = 0;
          }
        }, 500);
        // Set the control interval
        bolides.intervals.controlInterval = setInterval(bolides.control, 100);
        // Set the blinking interval
        bolides.intervals.blinkInterval = setInterval(function () {
            if (!bolides.spaceship.isVulnerable && bolides.spaceship.isBlinking) {
              bolides.spaceship.isBlinking = false;
            } else if (!bolides.spaceship.isVulnerable && !bolides.spaceship.isBlinking) {
              bolides.spaceship.isBlinking = true;
            } else if (bolides.spaceship.isVulnerable && bolides.spaceship.isBlinking) {
              bolides.spaceship.isBlinking = false;
            }
          }, 50);

        // Set the image sources
        bolides.images.ship.setAttribute('src', 'images/spaceship.png');
        bolides.images.asteroid.setAttribute('src', 'images/asteroid.png');
        bolides.images.heart.setAttribute('src', 'images/heart.png');
        bolides.images.bullet.setAttribute('src', 'images/bullet.png');
        bolides.images.bolide.setAttribute('src', 'images/bolide.png');
        bolides.images.ufo.setAttribute('src', 'images/ufo.png');
        bolides.images.ufobullet.setAttribute('src', 'images/evilbullet.png');

        //Set vital attributes
        bolides.spaceship.hearts = 3;
        bolides.spaceship.velocity.x = 0;
        bolides.spaceship.velocity.y = 0;
        bolides.asteroidList.forEach(function(asteroid){
          asteroid.speed = 4;
        });

        // Start looping
        bolides.loop();
    },
    // For restarting
    restart: function() {
      // Set the spaceship slowdown interval
      bolides.intervals.slowdownInterval = setInterval(function() {
        if (bolides.spaceship.velocity.x > 0.5 && !bolides.keyPresses.w && !bolides.keyPresses.up) {
          bolides.spaceship.velocity.x -= 0.5;
        } else if (bolides.spaceship.velocity.x < -0.5 && !bolides.keyPresses.w && !bolides.keyPresses.up) {
          bolides.spaceship.velocity.x += 0.5;
        } else if (bolides.spaceship.velocity.x < 0.5 && bolides.spaceship.velocity.x > -0.5 && !bolides.keyPresses.w && !bolides.keyPresses.up) {
          bolides.spaceship.velocity.x = 0;
        }
        if (bolides.spaceship.velocity.y > 0.5 && !bolides.keyPresses.w && !bolides.keyPresses.up) {
          bolides.spaceship.velocity.y -= 0.5;
        } else if (bolides.spaceship.velocity.y < -0.5 && !bolides.keyPresses.w && !bolides.keyPresses.up) {
          bolides.spaceship.velocity.y += 0.5;
        } else if (bolides.spaceship.velocity.y < 0.5 && bolides.spaceship.velocity.y > -0.5 && !bolides.keyPresses.w && !bolides.keyPresses.up) {
          bolides.spaceship.velocity.y = 0;
        }
      }, 500);
      // Set the control interval
      bolides.intervals.controlInterval = setInterval(bolides.control, 100);
      // Set the blinking interval
      bolides.intervals.blinkInterval = setInterval(function () {
          if (!bolides.spaceship.isVulnerable && bolides.spaceship.isBlinking) {
            bolides.spaceship.isBlinking = false;
          } else if (!bolides.spaceship.isVulnerable && !bolides.spaceship.isBlinking) {
            bolides.spaceship.isBlinking = true;
          } else if (bolides.spaceship.isVulnerable && bolides.spaceship.isBlinking) {
            bolides.spaceship.isBlinking = false;
          }
        }, 50);

        //Set vital attributes
        bolides.spaceship.hearts = 3;
        bolides.spaceship.velocity.x = 0;
        bolides.spaceship.velocity.y = 0;
        bolides.asteroidList.forEach(function(asteroid){
          asteroid.speed = 4;
        });
        // Start the loop
        bolides.loop();
    },

    gameOver: function() {
        bolides.canvas.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        bolides.canvas.ctx.font = "48px Ubuntu";
        bolides.canvas.ctx.fillStyle = "white";
        bolides.canvas.ctx.fillText("Game Over", window.innerWidth / 2 - window.innerWidth / 12, window.innerHeight / 2 - 50);
        bolides.canvas.ctx.fillRect(window.innerWidth / 2 - window.innerWidth / 12, window.innerHeight / 2 - 26, 250, 60);
        bolides.canvas.ctx.fillStyle = "black";
        bolides.canvas.ctx.fillText("Restart?", window.innerWidth / 2 - window.innerWidth / 12 + 40, window.innerHeight / 2 + 20);
        addEventListener('click', function(e) {
            if (((window.innerWidth / 2 - window.innerWidth / 12 < e.clientX) && (e.clientX < window.innerWidth / 2 - window.innerWidth / 12 + 250)) && ((window.innerHeight / 2 - 26 < e.clientY) && (e.clientY < window.innerHeight / 2 + 34))) {
                bolides.restart();
            }
        });
        bolides.canvas.ctx.fillStyle = "white";
        bolides.canvas.ctx.fillText("Score: " + bolides.score, window.innerWidth / 2 - window.innerWidth / 12, window.innerHeight / 2 + 90);
        clearInterval(bolides.intervals.slowdownInterval);
        clearInterval(bolides.intervals.controlInterval);
        clearInterval(bolides.intervals.blinkInterval);
        addEventListener('resize', bolides.gameOver);
    },

    loop: function() {
        // Is the player out of health?
        if (bolides.spaceship.hearts <= 0) {
            // Then display "Game over"
            bolides.gameOver();
        } else {
            // No? Then move and draw everything, then loop again.
            // PS: also resize the canvas
            bolides.canva.width = window.innerWidth - 4;
            bolides.canva.height = window.innerHeight - 4;
            bolides.move();
            bolides.draw();
            requestAnimationFrame(bolides.loop);
        }
    },

    control: function() {
        // Up key or W key?
        if (bolides.keyPresses.up || bolides.keyPresses.w) {
          if (bolides.spaceship.velocity.x > 10) {
            if (Math.sin(bolides.spaceship.angle) < 0) {
              bolides.spaceship.velocity.x += Math.sin(bolides.spaceship.angle);
            }
          }
          if  (bolides.spaceship.velocity.y > 10) {
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
            // Down key or S key?
        if (bolides.keyPresses.down || bolides.keyPresses.s) {
            // Then decrease speed.
            if (bolides.spaceship.speed > 0) {
                bolides.spaceship.speed -= 1;
            }
            // R key?
        }
        if (bolides.keyPresses.r) {
            // Then remove a heart.
            bolides.spaceship.hearts -= 1;
            // Left key or A key?
        }
        if (bolides.keyPresses.left || bolides.keyPresses.a) {
            // Then change its angle by 20 degrees over 1/10 second
            var leftInterval = setInterval(function() {
                bolides.spaceship.angle -= degreesToRadians(6);
            }, 20);
            setTimeout(function() {
                clearInterval(leftInterval);
            }, 100);
            // Right key or D key?
        }
        if (bolides.keyPresses.right || bolides.keyPresses.d) {
            // Then change its angle by -20 degrees over 1/10 second
            var rightInterval = setInterval(function() {
                bolides.spaceship.angle += degreesToRadians(6);
            }, 20);
            setTimeout(function() {
                clearInterval(rightInterval);
            }, 100);
        }
    },

    move: function() {
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
        // If it's moving and vulnerable
        if (bolides.spaceship.velocity.x + bolides.spaceship.velocity.y !== 0 && bolides.spaceship.isVulnerable) {
            // Use the moving ship pic.
            bolides.images.ship.setAttribute('src', "images/spaceship-move.png");
            // Elsewise, don't.
        } else if (bolides.spaceship.velocity.x + bolides.spaceship.velocity.y === 0 && bolides.spaceship.isVulnerable) {
            bolides.images.ship.setAttribute('src', "images/spaceship.png");
        }
        bolides.bulletList.forEach( function (bullet) {
        // Stop bullet
        if (!bullet.isBeingFired) {
          if (bullet === bolides.bullet1) {
            bullet.x = window.innerWidth - 65;
            bullet.y = 35;
            bullet.angle = 0;
            bullet.speed = 10;
            bullet.isCooling = false;
          } else if (bullet === bolides.bullet2) {
            bullet.x = window.innerWidth - 50;
            bullet.y = 35;
            bullet.angle = 0;
            bullet.speed = 10;
            bullet.isCooling = false;
          } else {
            bullet.x = window.innerWidth - 35;
            bullet.y = 35;
            bullet.angle = 0;
            bullet.speed = 10;
            bullet.isCooling = false;
          }
        } else {
            // Bullet math
            bullet.direction.x = Math.sin(bullet.angle);
            bullet.direction.y = -Math.cos(bullet.angle);
            bullet.x += bullet.direction.x * bullet.speed;
            bullet.y += bullet.direction.y * bullet.speed;
        }
        if (bullet.x <= -25 && !bullet.isCooling) {
            bullet.isCooling = true;
            setTimeout(function() {
                bullet.isBeingFired = false;
            }, 1000);
        } else if (bullet.x >= window.innerWidth && !bullet.isCooling) {
            bullet.isCooling = true;
            setTimeout(function() {
                bullet.isBeingFired = false;
            }, 1000);
        }
        if (bullet.y >= window.innerHeight + 30 && !bullet.isCooling) {
            bullet.isCooling = true;
            setTimeout(function() {
                bullet.isBeingFired = false;
            }, 1000);
        } else if (bullet.y <= 0 && !bullet.isCooling) {
            bullet.isCooling = true;
            setTimeout(function() {
                bullet.isBeingFired = false;
            }, 1000);
          }
        }
      );
        // Asteroid math
        bolides.asteroidList.forEach(function(asteroid) {
          if (Math.random() < 0.5 && !asteroid.isInMotion) {
              asteroid.isBolide = Math.random() < 0.05;
              asteroid.x = (Math.random() * (window.innerWidth + 100) + 50);
              asteroid.y = -50;
              asteroid.angle = Math.random() * 2.9670597283903604 + 1.6580627893946132;
              asteroid.isInMotion = true;
          } else if (!asteroid.isInMotion) {
              asteroid.isBolide = Math.random() < 0.05;
              asteroid.x = window.innerWidth + 50;
              asteroid.y = Math.random() * (window.innerHeight - 50) + 50;
              asteroid.angle = Math.random() * 2.9670597283903604 + 3.2288591161895095;
              asteroid.isInMotion = true;
          }
          asteroid.direction.x = Math.sin(asteroid.angle);
          asteroid.direction.y = -Math.cos(asteroid.angle);
          asteroid.x += asteroid.direction.x * asteroid.speed;
          asteroid.y += asteroid.direction.y * asteroid.speed;
          if (asteroid.x <= -60) {
              asteroid.isInMotion = false;
          } else if (asteroid.x >= window.innerWidth + 60) {
              asteroid.isInMotion = false;
          }
          if (asteroid.y >= window.innerHeight + 60) {
              asteroid.isInMotion = false;
          } else if (asteroid.y <= -50) {
              asteroid.isInMotion = false;
          }
        }
        );
        // Collision detection
        for (var l = 1; l < 4; l++) {
          if (bolides.isTouchingSpaceship(bolides.spaceship, bolides["asteroid" + l]) && bolides.spaceship.isVulnerable) {
            bolides.spaceship.hearts -= 1;
            bolides.spaceship.x = window.innerWidth / 2 - 18;
            bolides.spaceship.y = window.innerHeight / 2 - 31;
            bolides.spaceship.isVulnerable = false;
            setTimeout(function() {
                bolides.spaceship.isVulnerable = true;
            }, 2000);
          }
        }
        for (var i = 1; i < 4; i++) {
          for (var j = 1; j < 4; j++) {
            if (bolides.isTouchingBullet(bolides["bullet" + i], bolides["asteroid" + j])) {
              bolides["asteroid" + j].isInMotion = false;
              bolides["bullet" + i].isBeingFired = false;
              if (bolides["asteroid" + j].isBolide) {
                bolides.score += 500;
              } else {
                bolides.score += 100;
              }
            }
          }
        }
    },
    draw: function() {
        // Clear the canvas
        bolides.canvas.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        if (bolides.spaceship.isBlinking) {

        } else {
          // Save it so I can mess about as much as I want
          bolides.canvas.ctx.save();
          // Set the origin to the ship's center
          bolides.canvas.ctx.translate(bolides.spaceship.x + 18, bolides.spaceship.y + 31);
          // Rotate the ship around the center by the angle of the ship
          bolides.canvas.ctx.rotate(bolides.spaceship.angle);
          // Draw the ship
          bolides.canvas.ctx.drawImage(bolides.images.ship, -18, -31, 36, 62);
          // Restore all messing about
          bolides.canvas.ctx.restore();
        }
        // Hey look more saving
        bolides.canvas.ctx.save();
        // Set the origin to the bullet's origin
        bolides.canvas.ctx.translate(bolides.bullet1.x + 3, bolides.bullet1.y - 12.5);
        // Rotate the canvas
        bolides.canvas.ctx.rotate(bolides.bullet1.angle);
        // Fastest draw in the west
        bolides.canvas.ctx.drawImage(bolides.images.bullet, -3, -12.5);
        // Restore again
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
        // Draw the 1st asteroid
        if (bolides.asteroid1.isBolide) {
          bolides.canvas.ctx.save();
          bolides.canvas.ctx.translate(bolides.asteroid1.x + 31, bolides.asteroid1.y + 31);
          bolides.canvas.ctx.rotate(bolides.asteroid1.angle);
          bolides.canvas.ctx.drawImage(bolides.images.bolide, -31, -31, 62, 154);
          bolides.canvas.ctx.restore();
        } else {
          bolides.canvas.ctx.drawImage(bolides.images.asteroid, bolides.asteroid1.x, bolides.asteroid1.y, 62, 62);
        }
        // Draw the 2nd asteroid
        if (bolides.asteroid2.isBolide) {
          bolides.canvas.ctx.save();
          bolides.canvas.ctx.translate(bolides.asteroid2.x + 31, bolides.asteroid2.y + 31);
          bolides.canvas.ctx.rotate(bolides.asteroid2.angle);
          bolides.canvas.ctx.drawImage(bolides.images.bolide, -31, -31, 62, 154);
          bolides.canvas.ctx.restore();
        } else {
          bolides.canvas.ctx.drawImage(bolides.images.asteroid, bolides.asteroid2.x, bolides.asteroid2.y, 62, 62);
        }
        // Draw the 3rd asteroid
        if (bolides.asteroid3.isBolide) {
          bolides.canvas.ctx.save();
          bolides.canvas.ctx.translate(bolides.asteroid3.x + 31, bolides.asteroid3.y + 31);
          bolides.canvas.ctx.rotate(bolides.asteroid3.angle);
          bolides.canvas.ctx.drawImage(bolides.images.bolide, -31, -31, 62, 154);
          bolides.canvas.ctx.restore();
        } else {
          bolides.canvas.ctx.drawImage(bolides.images.asteroid, bolides.asteroid3.x, bolides.asteroid3.y, 62, 62);
        }
        // HUD Style
        bolides.canvas.ctx.fillStyle = "white";
        bolides.canvas.ctx.font = "24px Ubuntu";
        // Draw Health word
        bolides.canvas.ctx.fillText("Health:", 10, 30);
        // Draw Ammo word
        bolides.canvas.ctx.fillText("Ammo:", window.innerWidth - 150, 30);
        // Draw speed words
        bolides.canvas.ctx.fillText("Speed: " + bolides.spaceship.velocity.x + ", " + bolides.spaceship.velocity.y, 10, window.innerHeight - 20);
        // Draw score
        bolides.canvas.ctx.fillText("Score: " + bolides.score, window.innerWidth - 150, window.innerHeight - 20);
        // Check for the number of hearts and draw that many
        if (bolides.spaceship.hearts === 3) {
            bolides.canvas.ctx.drawImage(bolides.images.heart, 90, 15);
            bolides.canvas.ctx.drawImage(bolides.images.heart, 110, 15);
            bolides.canvas.ctx.drawImage(bolides.images.heart, 130, 15);
        } else if (bolides.spaceship.hearts === 2) {
            bolides.canvas.ctx.drawImage(bolides.images.heart, 90, 15);
            bolides.canvas.ctx.drawImage(bolides.images.heart, 110, 15);
        } else if (bolides.spaceship.hearts === 1) {
            bolides.canvas.ctx.drawImage(bolides.images.heart, 90, 15);
        } else {
            bolides.canvas.ctx.fillStyle = 'red';
            bolides.canvas.ctx.fillText(bolides.spaceship.hearts, 90, 30);
        }
        bolides.ufoList.forEach(function(ufo) {
          bolides.canvas.ctx.drawImage(bolides.images.ufo, ufo.x, ufo.y);
        });
        bolides.evilBulletList.forEach(function(bullet) {
          bolides.canvas.ctx.drawImage(bolides.images.ufobullet, bullet.x, bullet.y);
        });
    }
};

bolides.menu.menustart();
