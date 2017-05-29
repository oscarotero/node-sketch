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

  get id() {
    return this.do_objectID;
  }

  findParent(type, condition) {
    let parent = this[_parent];

    while (parent) {
      if (parent._class === type && (!condition || condition(parent))) {
        return parent;
      }

      parent = parent[_parent];
    }
  }

  find(type, condition) {
    for (let [key, value] of Object.entries(this)) {
      if (
        value instanceof Node &&
        value._class === type &&
        (!condition || condition(value))
      ) {
        return value;
      }

      if (Array.isArray(value)) {
        for (let child of value) {
          if (child instanceof Node) {
            if (child._class === type && (!condition || condition(child))) {
              return child;
            }

            const result = child.find(type, condition);

            if (result) {
              return result;
            }
          }
        }
      }
    }
  }

  findAll(type, condition, result) {
    result = result || [];

    for (let [key, value] of Object.entries(this)) {
      if (
        value instanceof Node &&
        value._class === type &&
        (!condition || condition(value))
      ) {
        result.push(value);
      }

      if (Array.isArray(value)) {
        for (let child of value) {
          if (child instanceof Node) {
            if (child._class === type && (!condition || condition(child))) {
              result.push(child);
            }

            child.findAll(type, condition, result);
          }
        }
      }
    }

    return result;
  }
}

module.exports = Node;
