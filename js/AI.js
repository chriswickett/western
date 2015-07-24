function AI (tree, actor) {

  function _AI () {
    this.state = this.generateTree(tree);
    this.actor = actor;
  }

  _AI.prototype = {
    
    generateTree: function(tree) {
      var generatedTree = this.read(tree, null);
      return generatedTree;
    },

    read: function(node, parent) {
      var builtNode = {
        name: node.name,
        parent: parent,
      };

      if (node.children) {
        builtNode.children = node.children.map(function(child) {
          return this.read(child, builtNode);
        }, this);
      }

      return builtNode;

    },

    decide: function() {
      if (this.can(this.state)) {
        this.run(this.state);
      } else {
        var nextState = null;
        for (var i in this.state.children) {
          var state = this.state.children[i];
          if (this.can(state)) {
            nextState = state;
            break;
          }
        } 
        if (nextState) {
          this.transitionTo(nextState);
        } else if (!!this.state.parent) this.state = this.state.parent; 
      }
    },

    transitionTo: function(state) {
      this.state = state;
      this.run(state);
    },

    can: function(state) {
      return (this.actor[state.name + "Possible"]());
    },

    run: function(state) {
      this.actor[state.name]();
    }

  };

  return new _AI();
}