const Node = require('./Node');

/**
 * Abstrac class representing a sketch Layer (for example: a group, shapeGroup, text, bitmap, etc)
 *
 * @abstract
 * @extends {Node}
 * @ignore
 */
class Layer extends Node {
  /**
   * Returns the shared style used, if exists
   * @return {SharedStyle|undefined}
   */
  getSharedStyle() {
    return this.style.getSharedStyle();
  }

  /**
   * Apply a shared style, replacing the previous shared style if exists.
   * 
   * @param {SharedStyle} style
   */
  setSharedStyle(style) {
    this.style.setSharedStyle(style);
  }
}

module.exports = Layer;
