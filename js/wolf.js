function Wolf(game, key, x, y, master) {
  
  var _Wolf = new Living(game, key, x, y, 'Hero', 16);

  var _WolfBehavior = {
    
    master: master,
    lonely: false,
    worriedDistance: 130,
    safeDistance: 100,

    update: function() {

      this.clock += this.game.time.physicsElapsedMS;

      if (this.clock > this.reactionTime) {
        this.distanceFromMaster = this.getDistanceFromMaster();
        this.ai.decide(); 
        this.clock = 0;
      }

      if (!!this.waypoint) this.moveToWaypoint();
    },

    getDistanceFromMaster: function() {
      return this.getDistanceFromPoint(this.master.body.position);
    },

    idlePossible: function() {
      return (this.distanceFromMaster < this.worriedDistance);
    },

    idle: function() {
      this.waypoint = null;
      this.lonely = false;
      this.animations.stop();
    },

    followPossible: function() {
      return (this.distanceFromMaster > this.safeDistance);
    },

    follow: function() {
      this.lonely = true;
      this.waypoint = this.master.body.position;
    },
    
    greetPossible: function() {
      return this.lonely;
    },

    greet: function() {
      console.log('Woof!');
      this.lonely = false;
    },
  };

  extend(_Wolf, _WolfBehavior);

  var frames = {
    down: [54,55,56],
    left: [68,67,66],
    right: [78,79,80],
    up: [90,91,92]
  };
  
  extend(_Wolf, IsWalker(frames, 9, 80));
  _Wolf.initWalker();
  _Wolf.animations.frame = 55;

  var behaviourTree = {
    name: 'idle',
    children: [
      {
        name: 'follow',
        children: [ { name: 'greet' } ]
      },
      {
        name: 'fight'
      },
    ]
  };

  extend(_Wolf, IsIntelligent(behaviourTree, _Wolf));

  return _Wolf;
}