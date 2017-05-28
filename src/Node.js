const _parent = Symbol.for('Parent');
const lib = require('../');

class Node {
  constructor(parent, data) {
    this[_parent] = parent;

    Object.keys(data).forEach(key => {
      //is a subclass
      if (typeof data[key] === 'object' && '_class' in data[key]) {
        this[key] = lib.create(this, data[key]);
        return;
      }

      //is an array of subclasses
      if (
        Array.isArray(data[key]) &&
        typeof data[key][0] === 'object' &&
        '_class' in data[key][0]
      ) {
        this[key] = data[key].map(child => lib.create(this, child));
        return;
      }

      this[key] = data[key];
    });
  }

  get parent() {
    return this[_parent];
  }

  set parent(parent) {
    this[_parent] = parent;
  }
}

module.exports = Node;
