var Map = function(src, x, y, noTread) {

  function F() {
    this.polygons = [];
    var self = this;
    
    noTread.objects.forEach(function(object) {
      var newPolygon = [];
      
      object.polygon.forEach(function(coordinates){
        newPolygon.push({
          x: coordinates.x + object.x,
          y: coordinates.y + object.y
        });
      });
    
      self.polygons.push(newPolygon);
    });
  };

  F.prototype = new Sprite(src, x, y);
  return new F();

}