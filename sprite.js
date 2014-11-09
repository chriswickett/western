var Sprite = function(src, x, y) {
  this.x = x;
  this.y = y;
  this.ready = false;
  this.image = new Image();

  var self = this;

  this.image.onload = function() {
    self.ready = true;
    self.width = self.image.width;
    self.height = self.image.height;
  };
  
  this.image.src = src;

}