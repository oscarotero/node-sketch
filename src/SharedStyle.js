const _parent = Symbol.for('Parent');
const Node = require('./Node');

/**
 * Represents a shared style
 * @ignore
 * @extends {Node}
 * @see {@link SharedStyleContainer}
 * @see {@link SharedTextStyleContainer}
 */
class SharedStyle extends Node {
  detach() {
    if (this[_parent]) {
      const index = this.parent.objects.indexOf(this);

      if (index !== -1) {
        this[_parent].objects.splice(index, 1);
      }
    }

    this[_parent] = null;

    return this;
  }
}

module.exports = SharedStyle;
