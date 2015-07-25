function IsIntelligent (behaviourTree, actor) {

  var intelligence = {
    reactionTime: 350,
    aiClock: 0,
    ai: new AI(behaviourTree, actor)
  };

  return intelligence;
}