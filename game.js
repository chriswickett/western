var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

var camera = {
  x: 0,
  y: 0,
  reset: function() {
    this.x = player.x - canvas.width / 2;
    this.y = player.y - canvas.height / 2;
  }
}

var map1 = new Map('images/level1.png', 0, 0, level1);

map1.starts = {
  south: {
    x: 359,
    y: 580
  }
};

var map2 = new Map('images/level2.png', 0, 0, level2);

map2.starts = {
  north: {
    x: 431,
    y: 41,
  },
  west: {
    x: 100,
    y: 400
  }
};

var map = map1;

var travelTo = function(targetMap, direction) {
   map = targetMap;
   player.x = map.starts[direction].x;
   player.y = map.starts[direction].y;
   camera.reset();
   target.active = false;
}


canvas.addEventListener("click", function(click) {
  
  var click = {
    x: click.offsetX - canvas.offsetTop + camera.x,
    y: click.offsetY + canvas.offsetLeft + camera.y
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
  
  if (camera.x < 0) camera.x = 0;
  if (camera.x > map.image.width - canvas.width) camera.x = map.image.width - canvas.width;
  if (camera.y < 0) camera.y = 0;
  if (camera.y > map.image.height - canvas.height) camera.y = map.image.height - canvas.height;
  
  if (map == map1 && player.y > map.starts.south.y) {
    travelTo(map2, "north"); 
  }
  if(map == map2 && player.y < map.starts.north.y) {
    travelTo(map1, "south");
  }
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
  if (target.active && target.ready) {
    ctx.drawImage(target.image, (target.x - target.width / 2) - camera.x, (target.y - target.height / 2) - camera.y);
  }
  
  // Draw player
  if (player.ready) {
    ctx.drawImage(player.image, (player.x - player.width / 2) - camera.x, (player.y - player.height / 2) - camera.y );
  }
  
  ctx.font="12px Georgia";
  var text = Math.round(target.x) + ", " + Math.round(target.y);
  ctx.fillText(text,20,20);
}

var gameLoop = function() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

gameLoop();