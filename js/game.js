var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

game.findObjectsByType = function(type, map, layer) {
  var result = [];
  map.objects[layer].forEach( function(element) {
    if (element.type === type) {
      element.y -= map.tileHeight;
      result.push(element);
    }
  });
  return result;
};

function PhaserGame() {

  function _PhaserGame() {

  }

  _PhaserGame.prototype = {

    preload: function() {

      this.game.load.spritesheet('player', 'images/cowboy-sprite.png', 48, 48);
      this.game.load.spritesheet('animals', 'images/animals.png', 32, 32);
      this.game.load.tilemap('level1', 'levels/level1.json', null, Phaser.Tilemap.TILED_JSON);      
      this.game.load.image('desertTileset', 'images/desert-tileset.png');
    
    },

    create: function() {

      // Set up level
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.map = this.game.add.tilemap('level1');
      this.game.map.addTilesetImage('desert', 'desertTileset');
      this.game.backgroundlayer = this.game.map.createLayer('Background');
      this.game.blockedLayer = this.game.map.createLayer('blockedTile');
      this.game.map.setCollisionBetween(1, 100000, true, 'blockedTile');
      this.game.backgroundlayer.resizeWorld();
      
      // Spawn objects
      var playerPos = this.game.findObjectsByType('playerStart', this.game.map, 'objectLayer');
      var wolfPos = this.game.findObjectsByType('wolfStart', this.game.map, 'objectLayer');
      
      this.game.player = new Player(this.game, 'player', playerPos[0].x, playerPos[0].y);
      this.game.wolf = new Wolf(this.game, 'animals', wolfPos[0].x, wolfPos[0].y, this.game.player),
      this.game.chicken = new Chicken(this.game, 'animals', 100, 100);

      this.game.livings = [
        this.game.wolf,
        this.game.player,
        this.game.chicken
      ];

      // Set up camera
      this.game.camera.follow(this.game.player);
      this.game.camera.roundPx = false;
      
      // Set up controls
      this.game.cursors = this.game.input.keyboard.createCursorKeys();
    },

    update: function() {

      var followKey = this.game.input.keyboard.addKey(Phaser.Keyboard.F);
      var stayKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);

      if (stayKey.isDown) {
        this.game.wolf.hearCommand('stay');
      }

      if (followKey.isDown) {
        this.game.wolf.hearCommand('follow');
      }

      this.game.physics.arcade.collide(this.game.wolf, this.game.blockedLayer);
      this.game.physics.arcade.collide(this.game.player, this.game.blockedLayer);

    }

  };

  return new _PhaserGame();

}

game.state.add('Game', new PhaserGame(), true);
