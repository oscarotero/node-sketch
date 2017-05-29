const _parent = Symbol.for('Parent');
const Node = require('./Node');

class Layer extends Node {
  getSharedStyle() {
    return this.style.getSharedStyle();
  }

  setSharedStyle(style) {
    this.style.setSharedStyle(style);
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
