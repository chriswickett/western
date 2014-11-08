var playerImage = new Image();
var playerReady = false;

playerImage.onload = function() {
  playerReady = true;
};

playerImage.src = "images/hero.png";

var player = {
  x: null,
  y: null,
  width: 20,
  height: 20,
  color: "blue",
  speed: 2,
  vector: null
};