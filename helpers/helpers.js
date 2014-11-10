// Check is a point (with an X and Y value) is in a polygon
var isPointInPoly = function (poly, point){
  for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
    ((poly[i].y <= point.y && point.y < poly[j].y) || (poly[j].y <= point.y && point.y < poly[i].y))
    && (point.x < (poly[j].x - poly[i].x) * (point.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
    && (c = !c);
  return c;
}

// Calculate the distance between any two objects
var distanceBetween = function(a, b) {
  var xDist = Math.abs(a.x - b.x);
  var yDist = Math.abs(a.y - b.y);
  return Math.sqrt(xDist * xDist + yDist * yDist);
};

// Handy area transition function. Everything that happens when you change areas happens in here.
var travelTo = function(targetArea, direction) {
   target.active = false;
   area = targetArea;
   player.x = area.startpoints[direction].x;
   player.y = area.startpoints[direction].y;
   camera.reset();
}