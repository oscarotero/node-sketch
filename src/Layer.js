const _parent = Symbol.for('Parent');
const Node = require('./Node');

/**
 * Abstrac class representing a sketch Layer.
 * A layer is anything that is visible in the Layer list of sketch (a page, artboard, group, shapeGroup, text, bitmap, etc)
 * so, all these classes extends this class.
 *
 * @abstract
 * @extends {Node}
 * @ignore
 */
class Layer extends Node {
  /**
   * Returns the shared style used, if exists
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
   * Apply a shared style, replacing the previous shared style if exists.
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
}

Layer._classType = 'layer';

module.exports = Layer;
