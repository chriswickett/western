var Sprite = function(src, x, y) {
  
  var self = this;
  
  this.x = x;
  this.y = y;
  this.ready = false;
  this.image = new Image();

  this.image.onload = function() {
    self.ready = true;
    self.width = self.image.width;
    self.height = self.image.height;
  };
  
  this.image.src = src;

}