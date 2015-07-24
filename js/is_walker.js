function IsWalker (frames, animFPS, maxSpeed) {

  var walker = {
    waypoint: null,
    initWalker: function() {
      this.maxSpeed = maxSpeed;
      for (var key in frames) {
        var direction = key.charAt(0).toUpperCase() + key.slice(1);
        this.animations.add('walk' + direction, frames[key], animFPS, true);
      }
    },

    getDistanceFromWaypoint: function() {
      return this.getDistanceFromPoint(this.waypoint);
    },

    moveToWaypoint: function() {
      
      var distanceFromWaypoint = this.getDistanceFromWaypoint();
      
      if (distanceFromWaypoint < 10) {
        this.stop(); return false;
      }

      var vector = Phaser.Point.subtract(this.waypoint, this.body.position);
      var maxFrameDistance = this.game.time.physicsElapsed * this.maxSpeed;

      this.body.position.x += vector.x * maxFrameDistance / distanceFromWaypoint;
      this.body.position.y += vector.y * maxFrameDistance / distanceFromWaypoint;

      var angle = this.body.position.angle(this.waypoint, true);

      var direction;
      if (angle > -45 && angle <= 45) direction = 'Right';
      else if (angle > -135 && angle <= -45) direction = 'Up';
      else if (angle > 45 && angle <= 135) direction = 'Down';
      else direction = 'Left';

      this.animations.play('walk' + direction);
    },

    stop: function() {
      this.waypoint = null;
      this.animations.stop();
    }

  };

  return walker;
}