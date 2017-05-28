const _parent = Symbol.for('Parent');
const Node = require('./Node');

class Layer extends Node {
  get id() {
    return this.do_objectID;
  }

  detach() {
    if (this[_parent]) {
      const index = this.parent.layers.indexOf(this);

      if (index !== -1) {
        this[_parent].layers.splice(index, 1);
      }
    }

    this[_parent] = null;

    return this;
  }
}

module.exports = Layer;
