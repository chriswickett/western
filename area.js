var Area = function(src, noTread) {
  
  var self = this;
  
  this.polygons = [];
  this.ready = false;
  this.image = new Image();

  this.image.onload = function() {
    self.ready = true;
    self.width = self.image.width;
    self.height = self.image.height;
  };
  
  this.image.src = src;
  
  noTread.objects.forEach(function (object) {
    var newPolygon = [];
    
    object.polygon.forEach(function (coordinates) {
      newPolygon.push({
        x: coordinates.x + object.x,
        y: coordinates.y + object.y
      });
    });
  
    self.polygons.push(newPolygon);
  }); 

}