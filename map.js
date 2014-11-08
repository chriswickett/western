var map = {
  x: 0,
  y: 0,
  noTread: level1,
  image: new Image(),
  ready: false,
 polygons: []
}

map.image.onload = function() {
  map.ready = true;
  player.x = 100;
  player.y = 100;
};

map.image.src = "images/level1.png";

for (i in  map.noTread.objects) {
  var object =  map.noTread.objects[i];
  var newPolygon = [];
  
  for (i in object.polygon) {
    var coordinates = object.polygon[i];
    newPolygon.push({
      x: coordinates.x + object.x,
      y: coordinates.y + object.y
    });
  };

  map.polygons.push(newPolygon);
}
