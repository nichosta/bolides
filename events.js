/*jshint globals: false, unused: false, strict: false, debug: true, globalstrict: true, moz: true, browser: true, devel: true, jquery: true*/
function initiate() {
var canva = document.getElementById("canvas");
var canvas = canva.getContext("2d");
canvas.fillStyle = "red";
canvas.fillRect(10, 10, 100, 100);
};
addEventListener('load', initiate)