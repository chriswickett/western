function Player (game, key, x, y) {

  function _Player() {
    
    Phaser.Sprite.call(this, game, x, y, key);
    game.physics.arcade.enable(this);
    game.add.existing(this);
    
    this.faction = 'Hero';
    this.checkWorldBounds = true;

    // Starting frame
    this.animations.frame = 5;
    this.direction = 'Down';

    // // Animations
    this.animations.add('walkDown', [8,11,5], 8, true);
    this.animations.add('walkLeft', [3,6,9], 8, true);
    this.animations.add('walkRight', [1,4,7], 8, true);
    this.animations.add('walkUp', [2,10,0], 8, true);

  }

  _Player.prototype.constructor = Player;
  _Player.prototype = Object.create(Phaser.Sprite.prototype);

  var prototypeMethods = {

    update: function() {

      this.body.velocity.y = 0;
      this.body.velocity.x = 0;

      if (this.game.cursors.up.isDown) this.body.velocity.y -= 100;
      else if (this.game.cursors.down.isDown) this.body.velocity.y += 100;

      if (this.game.cursors.left.isDown) this.body.velocity.x -= 100;
      else if (this.game.cursors.right.isDown) this.body.velocity.x += 100;

      var totalVelocity = Math.abs(this.body.velocity.x) + Math.abs(this.body.velocity.y);

      if (totalVelocity) {
        var dest = new Phaser.Point(this.body.velocity.x + this.body.position.x, this.body.velocity.y + this.body.position.y);
        var angle = this.body.position.angle(dest, true) + 1;
        var direction;

        if (angle > -45 && angle <= 45) direction = 'Right';
        else if (angle > -135 && angle <= -45) direction = 'Up';
        else if (angle > 45 && angle <= 135) direction = 'Down';
        else direction = 'Left';  
        
        this.direction = direction;
      }

      var facingStills = {
        up: 0,
        down: 5,
        left: 6,
        right: 1
      };

      if (totalVelocity) {
        this.animations.play('walk' + this.direction);
      } else {
        this.animations.frame = facingStills[this.direction.toLowerCase()];
      }

    }
  };

  for (var attrName in prototypeMethods) { _Player.prototype[attrName] = prototypeMethods[attrName]; }
  return new _Player();

}
