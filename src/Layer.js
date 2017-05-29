const _parent = Symbol.for('Parent');
const Node = require('./Node');

/**
 * Abstrac class representing a sketch Layer.
 * A layer is anything that is visible in the Layer list of sketch (a page, artboard, group, shapeGroup, text, bitmap, etc)
 * so, all these classes extends this class.
 *
 * @abstract
 * @extends {Node}
 */
class Layer extends Node {
  /**
   * Returns the shared style used by this layer, if exists
   * @example
   * //Returns a layer named 'rectangle'
   * const layer = sketch.pages[0].findLayer('shapeGroup', (shape) => shape.name === 'rectangle');
   *
   * //Get the shared style applied to the layer
   * const sharedStyle = layer.getSharedStyle();
   *
   * @return {SharedStyle|undefined}
   */
  getSharedStyle() {
    return this.style.getSharedStyle();
  }

  /**
   * Apply a shared style to this layer, replacing the previous shared style if exists.
   * @example
   * //Returns a layer named 'rectangle'
   * const layer = sketch.pages[0].findLayer('shapeGroup', (shape) => shape.name === 'rectangle');
   *
   * //Get the shared style named 'blue'
   * const style = sketch.findSharedStyle((style) => style.name === 'blue');
   *
   * //Apply the style to the layer
   * layer.setSharedStyle(style);
   */
  setSharedStyle(style) {
    this.style.setSharedStyle(style);
  }

  /**
   * Removes the layer from its parent
   * @example
   * //Returns a group named 'buttons'
   * const buttons = sketch.pages[0].findLayer('group', (group) => group.name === 'buttons');
   *
   * //Removes the first button
   * const removedButton = buttons.layers[0].detach();
   *
   * @return {Layer} The layer itself
   */
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
