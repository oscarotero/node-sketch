const _sharedstyle = Symbol.for('sharedStyle');
const Node = require('./Node');

/**
 * Represents a style for a layer
 *
 * @extends {Node}
 * @see {@link SharedStyle}
 */
class Style extends Node {
  /**
   * Returns the shared style used by this style, if exists
   * @example
   * //Get a layer named 'block'
   * const block = sketch.pages[0].findLayer('shapeGroup', (shape) => shape.name === 'block');
   *
   * //Get its style
   * const blockStyle = block.style;
   *
   * //Get the shared style used
   * const sharedStyle = blockStyle.getSharedStyle();
   *
   * @return {SharedStyle|undefined}
   */
  getSharedStyle() {
    if (this[_sharedstyle]) {
      return this[_sharedstyle];
    }

    const sketch = this.findParent('sketch');

    let sharedStyle = sketch.findSharedStyle(
      style => style.do_objectID === this.sharedObjectID
    );

    if (!sharedStyle) {
      sharedStyle = sketch.findTextStyle(
        style => style.do_objectID === this.sharedObjectID
      );
    }

    this[_sharedstyle] = sharedStyle;
    return sharedStyle;
  }

  /**
   * Assign a new shared style to this style
   * @example
   * //Get a layer named 'block'
   * const block = sketch.pages[0].findLayer('shapeGroup', (shape) => shape.name === 'block');
   *
   * //Get its style
   * const blockStyle = block.style;
   *
   * //Get a shared style named 'red'
   * const red = sketch.findSharedStyle(style => style.name === 'red');
   *
   * //Assign the shared style to the style
   * blockStyle.setSharedStyle(red);
   */
  setSharedStyle(sharedStyle) {
    let clone = new Style(
      this.parent,
      JSON.parse(JSON.stringify(sharedStyle.value))
    );
    clone[_sharedstyle] = sharedStyle;
    clone.sharedObjectID = sharedStyle.do_objectID;
    this.parent.style = clone;
  }
}

module.exports = Style;
