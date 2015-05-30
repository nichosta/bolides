/*jshint globals: false, unused: false, strict: false, debug: true, globalstrict: true, moz: true, browser: true, devel: true, jquery: true*/
var bolides = {
    canvas: {
        ctx: '',
    },
    // Attributes of the player's ship declared
    spaceship: {
        // Starting x and y
        x: 200,
        y: 140,
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
        // Same attributes as the ship, aside from height
        x: Math.floor(Math.random() * 100 + 800),
        y: Math.floor(Math.random() * 100 + 30),
        speed: 5
    },
    // Images used by the project are created here
    images: {
        ship: document.createElement('img'),
        asteroid: document.createElement('img'),
        heart: document.createElement('img')
    },
    initiate: function(){
        // Declare the canvas's context as 2D
        var canva = document.getElementById('canvas');
        bolides.canvas.ctx = canva.getContext('2d');
        // EventListener for keypresses to change speed and stuff
        addEventListener('keydown', function(e){bolides.control(e);});
        // Set the image sources
        bolides.images.ship.setAttribute('src', "../bolides/images/spaceship.png");
        bolides.images.asteroid.setAttribute('src', "../bolides/images/asteroid.png");
        bolides.images.heart.setAttribute('src', "../bolides/images/heart.png");
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
        // Up key?
        if (key.keyCode === 38){
            // Then increase speed.
            bolides.spaceship.speed += 1;
        // Down key?
        } else if (key.keyCode === 40) {
            // Then decrease speed.
            bolides.spaceship.speed -= 1;
        // R key?
        } else if (key.keyCode === 82) {
            // Then remove a heart.
            bolides.spaceship.hearts -= 1;
        // Left key?
        } else if (key.keyCode === 37) {
            // Then change its angle by 5 degrees
            bolides.spaceship.angle -= 0.08726646259971647;
        // Right key?
        } else if (key.keyCode === 39) {
            // Then change its angle by -5 degrees
            bolides.spaceship.angle += 0.08726646259971647;
        }
    },
    move: function() {
        // Complicated mathy things I do not understand
        bolides.spaceship.direction.x = Math.sin(bolides.spaceship.angle);
        bolides.spaceship.direction.y = Math.cos(bolides.spaceship.angle);
        bolides.spaceship.x += bolides.spaceship.direction.x * bolides.spaceship.speed;
        bolides.spaceship.y += bolides.spaceship.direction.y * bolides.spaceship.speed;
        // If it's moving,
        if (bolides.spaceship.speed !== 0) {
            // Use the moving ship pic.
            bolides.images.ship.setAttribute('src', "../bolides/images/spaceship-move.png");
        // Elsewise, don't.
        } else {
            bolides.images.ship.setAttribute('src', "../bolides/images/spaceship.png");
        }
//        bolides.asteriod.x = ;
//        bolides.asteriod.y = 650;
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
        // Draw the asteroid (doesn't turn up because it's off the screen)
        bolides.canvas.ctx.drawImage(bolides.images.asteroid, bolides.asteriod.x, bolides.asteriod.y);
        // Check for the number of hearts and draw that many
        if (bolides.spaceship.hearts >= 3) {
            bolides.canvas.ctx.drawImage(bolides.images.heart, 10, 10);
            bolides.canvas.ctx.drawImage(bolides.images.heart, 35, 10);
            bolides.canvas.ctx.drawImage(bolides.images.heart, 60, 10);
        } else if (bolides.spaceship.hearts === 2) {
            bolides.canvas.ctx.drawImage(bolides.images.heart, 10, 10);
            bolides.canvas.ctx.drawImage(bolides.images.heart, 35, 10);
        } else {
            bolides.canvas.ctx.drawImage(bolides.images.heart, 10, 10);
        }
    }
};
// Actually start the program
addEventListener('load', function() {bolides.initiate();});