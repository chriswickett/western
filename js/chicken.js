function Chicken(game, key, x, y) {
  
  var _Chicken = new Living(game, key, x, y, 'Neutral', 16);

  var _ChickenBehavior = {

    fear: 0,

    update: function() {

      this.clock += this.game.time.physicsElapsedMS;

      if (this.clock > this.reactionTime) {
        this.ai.decide(); 
        this.clock = 0;
      }

      if (!!this.waypoint) this.moveToWaypoint();
    },

    idlePossible: function() {
      return false;
    },

    idle: function() {
      this.waypoint = null;
      this.animations.stop();
    },

    grazePossible: function() {
      return true;
    },

    graze: function() {
      console.log('Peck peck peck');
    },

  };

  extend(_Chicken, _ChickenBehavior);

  var frames = {
    down: [6,7,8],
    left: [18,19,20],
    right: [30,31,32],
    up: [42,43,44]
  };
  
  extend(_Chicken, IsWalker(frames, 8, 40));
  _Chicken.initWalker();
  _Chicken.animations.frame = 7;

  var behaviourTree = {
    name: 'idle',
    children: [
      { name: 'graze' }
    ]
  };

  extend(_Chicken, IsIntelligent(behaviourTree, _Chicken));

  return _Chicken;
}