/*jshint globals: false, unused: false, strict: false, debug: true, globalstrict: true, moz: true, browser: true, devel: true, jquery: true*/
var bolides = {
    canvas: {
        ctx: ''
    },
    goodShip: {
        x: 80,
        y: 60,
        speed: 0,
        hearts: 3
    },
    asteriod: {
        x: 400,
        y: 400,
        speed: 15
    },
    images: {
        ship: document.createElement('img'),
        asteroid: document.createElement('img'),
        heart: document.createElement('img')
    },
    initiate: function(){
        var canva = document.getElementById('canvas');
        bolides.canvas.ctx = canva.getContext('2d');
        addEventListener('keydown', function(e){bolides.control(e);});
        bolides.images.ship.setAttribute('src', "../bolides/images/spaceship.png");
        bolides.images.asteroid.setAttribute('src', "../bolides/images/asteroid.png");
        bolides.images.heart.setAttribute('src', "../bolides/images/heart.png");
        bolides.loop();
    },
    loop: function() {
        if(bolides.goodShip.hearts === 0) {
            bolides.canvas.ctx.clearRect(0, 0, 800, 600);
            bolides.canvas.ctx.font = "48px 'Comic Sans MS'";
            bolides.canvas.ctx.fillStyle = "white";
            bolides.canvas.ctx.fillText("U SUK", 200, 200);
        } else {
            bolides.move();
            bolides.draw();
            requestAnimationFrame(function() { bolides.loop(); });
        }
    },
    control: function(key) {
        if (key.keyCode === 38){
            bolides.goodShip.speed -= 1;
        } else if (key.keyCode === 40) {
            bolides.goodShip.speed += 1;
        } else if (key.keyCode === 82) {
            bolides.goodShip.hearts -= 1;
        }
    },
    move: function() {
//        bolides.goodShip.x += bolides.goodShip.speed;
        bolides.goodShip.y += bolides.goodShip.speed;
        bolides.asteriod.x = Math.floor(Math.random() * 500);
        bolides.asteriod.y = Math.floor(Math.random() * 500);
    },
    draw: function() {
        bolides.canvas.ctx.clearRect(0, 0, 800, 600);
        bolides.canvas.ctx.drawImage(bolides.images.ship, bolides.goodShip.x, bolides.goodShip.y);
        bolides.canvas.ctx.drawImage(bolides.images.asteroid, bolides.asteriod.x, bolides.asteriod.y);
        if (bolides.goodShip.hearts === 3) {
            bolides.canvas.ctx.drawImage(bolides.images.heart, 10, 10);
            bolides.canvas.ctx.drawImage(bolides.images.heart, 35, 10);
            bolides.canvas.ctx.drawImage(bolides.images.heart, 60, 10);
        } else if (bolides.goodShip.hearts === 2) {
            bolides.canvas.ctx.drawImage(bolides.images.heart, 10, 10);
            bolides.canvas.ctx.drawImage(bolides.images.heart, 35, 10);
        } else {
            bolides.canvas.ctx.drawImage(bolides.images.heart, 10, 10);
        }
    }
};
addEventListener('load', function() {bolides.initiate();});