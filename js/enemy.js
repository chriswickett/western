function Dog (game, key, x, y) {

  function _Dog() {
    
    Phaser.Sprite.call(this, game, x, y, key);
    game.physics.arcade.enable(this);
    game.add.existing(this);

    this.faction = 'Baddies';

    this.checkWorldBounds = true;
    this.maxSpeed = 80;
    this.clock = 0;
    this.biteRange = 40;
    this.hp = 16;
    this.health = 16;

    this.waypoint = null;
    this.distanceFromWaypoint = null;


    // Starting frame
    this.animations.frame = 1;
    this.direction = 'Down';

    // // Animations
    this.animations.add('walkDown', [0,1,2], 8, true);
    this.animations.add('walkLeft', [12,13,14], 8, true);
    this.animations.add('walkRight', [24,25,26], 8, true);
    this.animations.add('walkUp', [36,37,38], 8, true);

    this.ai = new AI({
      name: 'idle',
      children: [
        {
          name: 'attack',
          children: [  
            { name: 'moveToEnemy' },
            { name: 'bite' }
          ]
        }
      ]
    }, this);

    this.reactionTime = 150;

  }

  _Dog.prototype.constructor = Dog;
  _Dog.prototype = Object.create(Phaser.Sprite.prototype);

  var prototypeMethods = {


    update: function() {

      this.clock += this.game.time.physicsElapsedMS;

      if (this.clock > this.reactionTime) {
        this.ai.decide(); 
        this.clock = 0;
      }

      if (!!this.waypoint) this.moveToWaypoint();

    },

    enemiesInView: function() {
      return this.game.livings.filter(function(living) {
        return (living.faction !== this.faction);
      });
    },

    idlePossible: function() {
      return (this.enemiesInView() === 0);
    },

    idle: function() {},

    attackPossible: function() {
      return (
        this.enemiesInView() > 0 &&
        this.distanceFromTarget() > this.biteRange
      );
    },

    attack: function() {
      console.log('Grrr....');
    },

    bitePossible: function() {
      return (
        this.enemiesInView() > 0 &&
        this.distanceFromTarget() <= this.biteRange
      );
    },

    bite: function() {
      this.target.defend(6);
    },


  };

  for (var attrName in prototypeMethods) { _Dog.prototype[attrName] = prototypeMethods[attrName]; }
  return new _Dog();

}
