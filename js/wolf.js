function Wolf(game, key, x, y, master) {
  
  var _Wolf = new Living(game, key, x, y, 'Hero', 16);

  var _WolfBehavior = {
    
    master: master,
    lonely: false,
    worriedDistance: 130,
    safeDistance: 100,
    currentCommand: null,
    memoryClock: 0,
    attentionSpan: 4000,

    update: function() {

      this.aiClock += this.game.time.physicsElapsedMS;
      this.memoryClock += this.game.time.physicsElapsedMS;

      if (this.aiClock > this.reactionTime) {
        this.ai.decide();
        this.aiClock = 0;
      }

      if (this.memoryClock > this.attentionSpan) {
        this.currentCommand = null;
        this.memoryClock = 0;
      }

      if (!!this.waypoint) this.moveToWaypoint();

      console.log(this.currentCommand);
    },

    getDistanceFromMaster: function() {
      return this.getDistanceFromPoint(this.master.body.position);
    },

    isCloseToMaster: function() {
      return (this.getDistanceFromMaster() < this.worriedDistance);
    },

    canSeeAnimals: function() {
      return (this.livingsInView().length === 0);
    },

    idlePossible: function() {
      return (this.isCloseToMaster() && !this.canSeeAnimals());
    },

    idle: function() {
      this.waypoint = null;
      this.lonely = false;
      this.animations.stop();
    },

    chasePossible: function() {
      return (this.livingsInView("Neutral").length > 0);
    },

    chase: function() {
      this.waypoint = this.livingsInView('Neutral')[0].body.position;
    },  

    followPossible: function() {
      return (this.getDistanceFromMaster() > this.safeDistance && this.livingsInView("Neutral").length === 0);
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

    hearCommand: function(command) {
      var knownCommands = ['stay', 'follow'];
      if (knownCommands.indexOf(command) > -1) {
        this.memoryClock = 0;
        this.currentCommand = command;
      } else {
        console.error("Invalid wolf command: " + command);
      }
    }
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
        name: 'chase'
      },
      {
        name: 'follow',
        children: [ { name: 'greet' } ]
      },
    ]
  };

  extend(_Wolf, IsIntelligent(behaviourTree, _Wolf));
  extend(_Wolf, SeesLivings(250));

  return _Wolf;
}