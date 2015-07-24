function IsIntelligent(behaviourTree, actor) {

  var intelligence = {
    reactionTime: 150,
    clock: 0,
    ai: new AI(behaviourTree, actor)
  };

  return intelligence;
}