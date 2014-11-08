var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

// Target cursor

var target = {
  x: player.x,
  y: player.y,
  color: "black",
  width:  10,
  height: 10,
  active: false
}

var camera = {
  x: 0,
  y: 0
}

canvas.addEventListener("click", function(click) {
  
  var click = {
    x: click.layerX + camera.x,
    y: click.layerY + camera.y
  }

  // Set target
  target.x = click.x
  target.y = click.y
  target.active = true;
  player.vector = {};
  player.vector.x = player.x - target.x;
  player.vector.y = player.y - target.y;
  player.vector.speed = player.speed / distanceBetween(target, player);

});

var update = function() {
  
  if (target.active) {
    var xDiff = Math.abs(player.x - target.x);
    var yDiff = Math.abs(player.y - target.y);
    if (xDiff > player.speed || yDiff > player.speed ) { // If player needs to move, update player X and Y
      var newXY = {
        x: player.x - player.vector.x * player.vector.speed,
        y: player.y - player.vector.y * player.vector.speed
      }
    } else {
      target.active = false;
    }
    
    if (newXY != null) {
      var canMove = true;
      for (i in map.polygons) {
        var polygon = map.polygons[i];
        if (isPointInPoly(polygon, newXY)) {
          canMove = false;
          break;
        }
      }
      
      if (canMove) {
        player.x = newXY.x;
        player.y = newXY.y;
      } else {
        target.active = false;
      }
    }

  }
  camera.x = player.x - canvas.width / 2;
  camera.y = player.y - canvas.height / 2;

};

// Render loop.
var render = function () {
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Draw background
  if (map.ready) {
    ctx.drawImage(map.image, map.x - camera.x, map.y - camera.y);
  }
  // Draw target
  if (target.active) {
    ctx.fillStyle = target.color;
    ctx.fillRect((target.x - target.width / 2) - camera.x, (target.y - target.height / 2) - camera.y, target.width, target.height);
  }
  
  // Draw player
  if (playerReady) {
    ctx.drawImage(playerImage, (player.x - player.width / 2) - camera.x, (player.y - player.height / 2) - camera.y );
  }
}

var gameLoop = function() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

gameLoop();