/*jshint loopfunc: true, unused: false, strict: true, debug: true, globalstrict: true, moz: true, browser: true, devel: true, undef: true */
/* globals Asteroid, Bullet, EvilBullet, UFO, degreesToRadians */ // Errors are really distacting, so I killed most of them
'use strict';
var bolides = {
	// Self explanatory
	level: 1,
	score: 0,
	// The actual canvas element
	canva: 0,
	// The canvas context (2d in this situation)
	canvas: {
		ctx: ''
	},
	// Pause variable
	paused: false,

	// Interval object to store interval ids
	intervals: {
		slowdownInterval: 0,
		controlInterval: 0,
		// Whatever you do, don't blink. Blink and you're dead.
		blinkInterval: 0
	},
	// All the stuff related to the main menu (mostly self explanatory)
	menu: {
		nav: document.getElementsByTagName('nav')[0],
		instructions: document.getElementById('instructions'),
		credits: document.getElementById('credits'),
		shop: document.getElementById('shop'),
		menuStart: function() {
			document.getElementById('playButton').onclick = function() {
				bolides.initiate();
                // Uncomment the following code and remove/comment bolides.initiate(); to go to menu instead of starting the game immediately.
				/*bolides.menu.nav.style.display = 'none';
				document.getElementById('login').style.display = 'block';
				document.getElementsByClassName('bolide')[0].style.display = 'none';*/
			};
			document.getElementById('instructionsButton').onclick = function() {
				bolides.menu.nav.style.display = 'none';
				bolides.menu.instructions.style.display = 'block';
			};
			bolides.menu.instructions.onclick = function() {
				bolides.menu.nav.style.display = 'flex';
				bolides.menu.instructions.style.display = 'none';
			};
			document.getElementById('creditsButton').onclick = function() {
				bolides.menu.nav.style.display = 'none';
				bolides.menu.credits.style.display = 'block';
			};
			bolides.menu.credits.onclick = function() {
				bolides.menu.nav.style.display = 'flex';
				bolides.menu.credits.style.display = 'none';
			};
            // Below code is for unimplemented shop section.
			/*document.getElementById('shopButton').onclick = function() {
				bolides.menu.nav.style.display = 'none';
				bolides.menu.shop.style.display = 'block';
			};
			bolides.menu.shop.onclick = function() {
				bolides.menu.nav.style.display = 'flex';
				bolides.menu.shop.style.display = 'none';
			};*/
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
		ufo: document.createElement('img'),
		ufobullet: document.createElement('img'),
	},

	// Making all the bullets used in the program
	createBullets: function() {
		bolides.bullet1 = new Bullet(bolides.spaceship);
		bolides.bullet2 = new Bullet(bolides.spaceship);
		bolides.bullet3 = new Bullet(bolides.spaceship);
		bolides.bulletList = [bolides.bullet1, bolides.bullet2, bolides.bullet3];
	},
	// New asteroids are dynamically generated as the game progresses; that's why there's only one to begin with
	createAsteroids: function() {
		bolides.asteroid1 = new Asteroid();
		bolides.asteroidList = [bolides.asteroid1];
	},
	// Functions for determining collisions
	// I know they're really ugly, but they're staying the way they are.
	// This function is for asteroid / bullet collisions
	isTouchingBullet: function(bullet, asteroid) {
		return (
			(Math.pow(Math.abs(bullet.x - (asteroid.x + 31)), 2)) + (Math.pow(Math.abs(bullet.y - (asteroid.y + 31)), 2)) <= 1100) && bullet.isBeingFired;
	},
	// This function is for asteroid / spaceship collisions
	isTouchingSpaceship: function(spaceship, asteroid) {
		return (Math.pow(Math.abs(spaceship.x + 18 - (asteroid.x + 31)), 2) + Math.pow(Math.abs(spaceship.y + 31 - (asteroid.y + 31)), 2) <= 1300);
	},
	// Start all the stuff
	initiate: function() {
		// Declare the canvas's context as 2D
		bolides.canva = document.getElementById('canvas');
		bolides.canvas.ctx = bolides.canva.getContext('2d');

		// Set the canvas's size
		bolides.canva.width = window.innerWidth - 4;
		bolides.canva.height = window.innerHeight - 4;

		// Create assets
		bolides.createBullets();
		bolides.createAsteroids();
		// This is where I would put my UFOs... IF I HAD ANY

		// Keydown listeners
		addEventListener('keydown', function(e) {
			switch (e.keyCode) {
                // First case in each statement is for WASD key, second is arrow key
                case 87:
				case 38:
					bolides.keyPresses.up = true;
					break;
				case 65:
				case 37:
					bolides.keyPresses.left = true;
					break;
				case 83:
				case 40:
					bolides.keyPresses.down = true;
					break;
				case 68:
				case 39:
					bolides.keyPresses.right = true;
					break;
					// Space has a special listener because otherwise short presses have no effect
					// Checks for fireability from each bullet
				case 32:
					if (!bolides.bullet1.isBeingFired) {
						bolides.bullet1.fire();
					} else if (!bolides.bullet2.isBeingFired) {
						bolides.bullet2.fire();
					} else if (!bolides.bullet3.isBeingFired) {
						bolides.bullet3.fire();
					}
					break;
				case 80: // P
					bolides.pause();
			}
		});

		// Keyup listeners
		addEventListener('keyup', function(e) {
            switch(e.keyCode) {
                // First case in each statement is for WASD key, second is arrow key
                case 87:
                case 38:
    				bolides.keyPresses.up = false;
                    break;
                case 65:
                case 37:
    				bolides.keyPresses.left = false;
                    break;
                case 83:
                case 40:
    				bolides.keyPresses.down = false;
                    break;
                case 68:
                case 39:
    				bolides.keyPresses.right = false;
                    break;
            }
			// No special keyup listeners necessary.
		});
		// Set the spaceship slowdown interval (0.5 speed every half second)
		// Again, this is staying the way it is, even though it's ugly.
		bolides.intervals.slowdownInterval = setInterval(function() {
			if (bolides.spaceship.velocity.x > 0.5 && !bolides.keyPresses.up) {
				bolides.spaceship.velocity.x -= 0.5;
			} else if (bolides.spaceship.velocity.x <= -0.5 && !bolides.keyPresses.up) {
				bolides.spaceship.velocity.x += 0.5;
			} else if (bolides.spaceship.velocity.x < 0.5 && bolides.spaceship.velocity.x > -0.5 && !bolides.keyPresses.up) {
				bolides.spaceship.velocity.x = 0;
			}
			if (bolides.spaceship.velocity.y > 0.5 && !bolides.keyPresses.up) {
				bolides.spaceship.velocity.y -= 0.5;
			} else if (bolides.spaceship.velocity.y <= -0.5 && !bolides.keyPresses.up) {
				bolides.spaceship.velocity.y += 0.5;
			} else if (bolides.spaceship.velocity.y < 0.5 && bolides.spaceship.velocity.y > -0.5 && !bolides.keyPresses.up) {
				bolides.spaceship.velocity.y = 0;
			}
		}, 500);
		// Set the control interval
		bolides.intervals.controlInterval = setInterval(bolides.control, 100);
		// Set the blinking interval
		bolides.intervals.blinkInterval = setInterval(function() {
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

		//Set vital attributes again, just in case
		bolides.spaceship.hearts = 3;
		bolides.spaceship.velocity.x = 0;
		bolides.spaceship.velocity.y = 0;

		// Start looping
		bolides.loop();
	},

	gameOver: function() {
		// Clear the screen
		bolides.canvas.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		// Set the game over menu style
		bolides.canvas.ctx.font = '48px Arcade';
		bolides.canvas.ctx.fillStyle = 'white';
		// Draw the game over menu
		bolides.canvas.ctx.fillText('Game Over', window.innerWidth / 2 - window.innerWidth / 6, window.innerHeight / 2 - 50);
		// All this code was done on an 11-inch Macbook, so it probably looks awful on other computers.
		// Oh well.
		bolides.canvas.ctx.fillRect(window.innerWidth / 2 - window.innerWidth / 6, window.innerHeight / 2 - 26, 420, 60);
		bolides.canvas.ctx.fillStyle = 'black';
		// Draw the restart button
		bolides.canvas.ctx.fillText('Restart?', window.innerWidth / 2 - window.innerWidth / 6 + 30, window.innerHeight / 2 + 25);
		addEventListener('click', function(e) {
			if (((window.innerWidth / 2 - window.innerWidth / 6 < e.clientX) && (e.clientX < window.innerWidth / 2 - window.innerWidth / 6 + 420)) && ((window.innerHeight / 2 - 26 < e.clientY) && (e.clientY < window.innerHeight / 2 + 34))) {
				// Basically reloads the page
				window.location = window.location;
			}
		});
		// Yes I did just do that
		// Draw in the final level and score
		bolides.canvas.ctx.fillStyle = 'white';
		bolides.canvas.ctx.fillText('Score: ' + bolides.score, window.innerWidth / 2 - window.innerWidth / 6, window.innerHeight / 2 + 90);
		bolides.canvas.ctx.fillText('Level: ' + bolides.level, window.innerWidth / 2 - window.innerWidth / 6, window.innerHeight / 2 + 150);
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
			bolides.loop();
			// Pausing
		} else if (!bolides.paused) {
			bolides.paused = true;
			// I get rid of the control interval so you can't move while it's paused
			clearInterval(bolides.intervals.controlInterval);
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
			bolides.canva.width = window.innerWidth - 4;
			bolides.canva.height = window.innerHeight - 4;
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
		if (bolides.keyPresses.up) {
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
		// Down key does nothing, atm (may change)
		// Left key or A key?
		if (bolides.keyPresses.left) {
			// Then change its angle by 20 degrees over 1/10 second
			// This animation (and the right one, below) is added to smoothen turning
			var leftInterval = setInterval(function() {
				bolides.spaceship.angle -= degreesToRadians(6);
			}, 20);
			setTimeout(function() {
				clearInterval(leftInterval);
			}, 100);
		}
		// Right key or D key?
		if (bolides.keyPresses.right) {
			// Then change its angle by -20 degrees over 1/10 second
			// ( ͡° ͜ʖ ͡°)
			var rightInterval = setInterval(function() {
				bolides.spaceship.angle += degreesToRadians(6);
			}, 20);
			setTimeout(function() {
				clearInterval(rightInterval);
			}, 100);
		}
	},

	move: function() {
		// Level up
		if (bolides.level * 100 <= bolides.score) {
			// Remove score
			bolides.score = 0;
			// Increases level
			bolides.level++;
			// Create a new asteroid
			bolides['asteroid' + bolides.level] = new Asteroid();
			bolides.asteroidList.push(bolides['asteroid' + bolides.level]);
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
		// If it's moving and vulnerable
		if (bolides.spaceship.velocity.x + bolides.spaceship.velocity.y !== 0 && bolides.spaceship.isVulnerable) {
			// Use the moving ship pic.
			bolides.images.ship.setAttribute('src', 'images/spaceship-move.png');
			// Elsewise, don't.
		} else if (bolides.spaceship.velocity.x + bolides.spaceship.velocity.y === 0 && bolides.spaceship.isVulnerable) {
			bolides.images.ship.setAttribute('src', 'images/spaceship.png');
		}
		bolides.bulletList.forEach(function(bullet) {
			// Stop bullet
			if (!bullet.isBeingFired) {
				if (bullet === bolides.bullet1) {
					bullet.x = window.innerWidth - 65;
				} else if (bullet === bolides.bullet2) {
					bullet.x = window.innerWidth - 50;
				} else {
					bullet.x = window.innerWidth - 35;
				}
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
		});
		// Asteroid movement math
		// Dynamic number of asteroids === Use forEach on asteroid list
		// Fun fact: At least 5 times while coding this, I encountered a bug due to typing 'asteroid' as 'asteriod'
		// Also 'bolides' as 'boldies' or 'boildes'
		// Anyway, a good chunk of this math is exactly the same as what the spaceship has.
		bolides.asteroidList.forEach(function(asteroid) {
			// Choose where the asteroid comes from, its angle, and whether or not it's a bolide.
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
			// Asteroid stopping
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
		});
		// Collision detection (spaceship)
		// I used for loops instead of forEaches here because I think they look clearer
		for (var l = 1; l <= bolides.asteroidList.length; l++) {
			if (bolides.isTouchingSpaceship(bolides.spaceship, bolides['asteroid' + l]) && bolides.spaceship.isVulnerable) {
				bolides.spaceship.hearts -= 1;
				bolides.spaceship.x = window.innerWidth / 2 - 18;
				bolides.spaceship.y = window.innerHeight / 2 - 31;
				bolides.spaceship.isVulnerable = false;
				setTimeout(function() {
					bolides.spaceship.isVulnerable = true;
				}, 2000);
			}
		}
		// Collision detection (bullets)
		for (var i = 1; i <= bolides.bulletList.length; i++) {
			for (var j = 1; j <= bolides.asteroidList.length; j++) {
				if (bolides.isTouchingBullet(bolides['bullet' + i], bolides['asteroid' + j])) {
					bolides['asteroid' + j].isInMotion = false;
					bolides['bullet' + i].isBeingFired = false;
					if (bolides['asteroid' + j].isBolide) {
						bolides.score += 500;
					} else {
						bolides.score += 100;
					}
				}
			}
		}
	},

	// The whole drawing function
	draw: function() {
		// Clear the canvas
		bolides.canvas.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		// Draw the asteroids
		bolides.asteroidList.forEach(function(asteroid) {
			// If the asteroid is a bolide
			if (asteroid.isBolide) {
				// Make sure it's facing the right way
				bolides.canvas.ctx.save();
				bolides.canvas.ctx.translate(asteroid.x + 31, asteroid.y + 31);
				bolides.canvas.ctx.rotate(asteroid.angle);
				bolides.canvas.ctx.drawImage(bolides.images.bolide, -31, -31, 62, 154);
				bolides.canvas.ctx.restore();
			} else {
				// Otherwise you can just draw it normally, no one will notice
				// #Lifehacks
				bolides.canvas.ctx.drawImage(bolides.images.asteroid, asteroid.x, asteroid.y, 62, 62);
			}
		});

		// HUD Style
		bolides.canvas.ctx.fillStyle = 'white';
		bolides.canvas.ctx.font = '24px Arcade';
		// Draw level word
		bolides.canvas.ctx.fillText('Level: ' + bolides.level, 10, window.innerHeight - 20);
		// Draw score
		bolides.canvas.ctx.fillText('Score: ' + bolides.score, window.innerWidth - 250, window.innerHeight - 20);
		// Check for the number of hearts and draw that many
		for (var i = 1; i <= bolides.spaceship.hearts; i++) {
			bolides.canvas.ctx.drawImage(bolides.images.heart, (i - 1) * 30 + 5, 15);
		}
		// Spaceship almost last so it overlaps most things
		if (bolides.spaceship.isBlinking) {

		} else {
			// Save its state
			bolides.canvas.ctx.save();
			// Set the origin to the ship's center
			bolides.canvas.ctx.translate(bolides.spaceship.x + 18, bolides.spaceship.y + 31);
			// Rotate the ship around the center by the angle of the ship
			bolides.canvas.ctx.rotate(bolides.spaceship.angle);
			// Draw the ship
			bolides.canvas.ctx.drawImage(bolides.images.ship, -18, -31, 36, 62);
			// Restore to normal
			bolides.canvas.ctx.restore();
		}
		// There isn't really a reason the bullets are drawn over the spaceship.
		// They just are.
		bolides.bulletList.forEach(function(bullet) {
			bolides.canvas.ctx.save();
			// Set the origin to the bullet's origin
			bolides.canvas.ctx.translate(bullet.x + 3, bullet.y - 12.5);
			// Rotate the canvas
			bolides.canvas.ctx.rotate(bullet.angle);
			// Fastest draw in the west
			bolides.canvas.ctx.drawImage(bolides.images.bullet, -3, -12.5);
			// Restore again
			bolides.canvas.ctx.restore();
		});
	}
};

// That's it! Just start the menu now.
bolides.menu.menuStart();