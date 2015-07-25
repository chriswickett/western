function SeesLivings(sightRange) {

  var eyes = {
    sightRange: sightRange,
    livingsInView: function(faction) {

      var inFaction = this.game.livings.filter(function(living) {
        return living.faction === faction;
      });

      return inFaction.filter(function(living) {
        return (this.getDistanceFromPoint(living.body.position) < this.sightRange);
      }, this);

    }
  };

  return eyes;

}