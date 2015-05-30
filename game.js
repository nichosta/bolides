/*jshint globals: false, unused: false, strict: false, debug: true, globalstrict: true, moz: true, browser: true, devel: true, jquery: true*/
var bolides = {
    canvas: {
        ctx: ''
    },
    goodShip: {
        x: 300,
        y: 300,
        speed: 0
    },
    asteriod: {
        x: 400,
        y: 400,
        speed: 15
    },
    initiate: function(){
        var canva = document.getElementById('canvas');
        bolides.canvas.ctx = canva.getContext('2d');
        bolides.loop();
    },
    loop: function() {
        if(bolides.goodShip.speed !== 0){
            bolides.control();
            bolides.move();
        } else {
            bolides.canvas.ctx.font = "48px 'Comic Sans MS'";
            bolides.canvas.ctx.fillStyle = "white";
            bolides.canvas.ctx.fillText("U SUK", 200, 200);
        }
    },
    control: function() {
        addEventListener
    }
};
addEventListener('load', function() {bolides.initiate();});