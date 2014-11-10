var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

// Create the player
var player = new Sprite('images/cowboy-front.png', 100, 100);
player.speed = 2;

// Create the target cursor
var target = new Sprite('images/cursor-move.png', player.x, player.y);
target.active = false;

// Load up our maps...
var area1 = new Area('images/level1.png', level1);
var area2 = new Area('images/level2.png', level2);

// ...And set their start points
area1.startpoints = {
  south: { x: 359, y: 580 }
};

area2.startpoints = {
  north: { x: 431, y: 41 },
  west: { x: 100, y: 400 }
};

// Create the camera
var camera = {
  x: 0,
  y: 0,
  reset: function() {
    this.x = player.x - canvas.width / 2;
    this.y = player.y - canvas.height / 2;
    if (camera.x < 0) camera.x = 0;
    if (camera.x > currentArea.image.width - canvas.width) camera.x = currentArea.image.width - canvas.width;
    if (camera.y < 0) camera.y = 0;
    if (camera.y > currentArea.image.height - canvas.height) camera.y = currentArea.image.height - canvas.height;
  }
}

// Handle what happens when the user clicks
canvas.addEventListener("click", function(click) {
  
  var click = {
    x: click.offsetX + canvas.offsetLeft + camera.x,
    y: click.offsetY + canvas.offsetTop + camera.y
  }

  // Set target
  target.x = click.x
  target.y = click.y
  target.active = true;

});

// Update the current frame
var update = function() {
  
  if (!target.active) return false;
    
  var distanceToTarget = distanceBetween(target, player);

  if (distanceToTarget < player.speed) {
    target.active = false; return false;
  }
  
  var xVec = target.x - player.x;
  var yVec = target.y - player.y;
  var moveMultiplier = player.speed / distanceToTarget;

  var requestedXY = {
    x: player.x + xVec * moveMultiplier,
    y: player.y + yVec * moveMultiplier
  }
  
  currentArea.polygons.forEach(function(polygon) {
    if (isPointInPoly(polygon, requestedXY)) {
      var cannotMove = true;
      break;
    }
  })

  if (cannotMove) {
    target.active = false; return false;
  }

  // Update the player's position.
  player.x = requestedXY.x;
  player.y = requestedXY.y;
  camera.reset();

  // Handle area transitions
  if (currentArea == area1 && player.y > currentArea.startpoints.south.y) {
    travelTo(area2, "north"); 
  }
  if (currentArea == area2 && player.y < currentArea.startpoints.north.y) {
    travelTo(area1, "south");
  }
  
};

// Render the current frame
var render = function () {
  
  // Clear the canvas
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw background
  if (currentArea.ready) {
    ctx.drawImage(currentArea.image, currentArea.x - camera.x, currentArea.y - camera.y);
  }

  // Draw target
  if (target.active && target.ready) {
    ctx.drawImage(target.image, (target.x - target.width / 2) - camera.x, (target.y - target.height / 2) - camera.y);
  }
  
  // Draw player
  if (player.ready) {
    ctx.drawImage(player.image, (player.x - player.width / 2) - camera.x, (player.y - player.height / 2) - camera.y );
  }
  
  // Draw XY target co-ordinates
  ctx.font="12px Georgia";
  var text = Math.round(target.x) + ", " + Math.round(target.y);
  ctx.fillText(text,20,20);

}

// The game loop
var gameLoop = function() {
  update(); // Update everything in the current frame
  render(); // ...then draw it...
  requestAnimationFrame(gameLoop); // ...then request the next one!
}

var currentArea = area1; // Start the user in area 1
gameLoop(); // Start the game running!