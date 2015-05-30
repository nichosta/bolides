/*jshint globals: false, unused: false, strict: false, debug: true, globalstrict: true, moz: true, browser: true, devel: true, jquery: true*/
var bolides = {
    canvas: {
        ctx: ''
    },
    goodShip: {
        x: 300,
        y: 300,
        speed: 1
    },
    asteriod: {
        x: 400,
        y: 400,
        speed: 15
    },
    images: {
        ship: document.createElement('img'),
        asteroid: document.createElement('img')
    },
    initiate: function(){
        var canva = document.getElementById('canvas');
        bolides.canvas.ctx = canva.getContext('2d');
        addEventListener('keydown', function(e){bolides.control(e);});
        bolides.images.ship.setAttribute('src', "../bolides/images/spaceship.png");
        bolides.images.asteroid.setAttribute('src', "../bolides/images/asteroid.png");
        bolides.loop();
    },
    loop: function() {
        if(bolides.goodShip.speed > -100000000) {
            bolides.move();
            bolides.draw();
            console.log(bolides.goodShip.speed);
            requestAnimationFrame(function() { bolides.loop(); });
        } else {
            bolides.canvas.ctx.font = "48px 'Comic Sans MS'";
            bolides.canvas.ctx.fillStyle = "white";
            bolides.canvas.ctx.fillText("U SUK", 200, 200);
        }
    },
    control: function(key) {
        if (key.keyCode === 38){
            bolides.goodShip.speed += 1;
        } else if (key.keyCode === 40) {
            bolides.goodShip.speed -= 1;
        }
    },
    move: function() {
        bolides.goodShip.x += bolides.goodShip.speed;
        bolides.goodShip.y += bolides.goodShip.speed;
    },
    draw: function() {
        bolides.canvas.ctx.clearRect(0, 0, 800, 600);
        bolides.canvas.ctx.drawImage(bolides.images.ship, bolides.goodShip.x, bolides.goodShip.y);
    }
};
addEventListener('load', function() {bolides.initiate();});