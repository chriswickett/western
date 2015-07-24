function Living (game, key, x, y, faction, hp) {

  function _Living() {

    Phaser.Sprite.call(this, game, x, y, key);
    game.physics.arcade.enable(this);
    game.add.existing(this);
        
    this.faction = faction;
    this.checkWorldBounds = true;
    this.hp = hp;
    this.health = hp;
  }

  var prototypeMethods = {
    getDistanceFromPoint: function(point) {
      return this.body.position.distance(point);
    }
  };

  _Living.prototype = Object.create(Phaser.Sprite.prototype);
  _Living.prototype.constructor = Living;
  
  extend(_Living.prototype, prototypeMethods);

  return new _Living();

}