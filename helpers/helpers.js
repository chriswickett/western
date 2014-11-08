var isPointInPoly = function (poly, point){
  for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
    ((poly[i].y <= point.y && point.y < poly[j].y) || (poly[j].y <= point.y && point.y < poly[i].y))
    && (point.x < (poly[j].x - poly[i].x) * (point.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
    && (c = !c);
  return c;
}

var distanceBetween = function(a, b) {
  var xDist = Math.abs(a.x - b.x);
  var yDist = Math.abs(a.y - b.y);
  return Math.sqrt(xDist * xDist + yDist * yDist);
};