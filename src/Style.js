const _sharedstyle = Symbol.for('sharedStyle');
const Node = require('./Node');

/**
 * Represents the style of a layer
 *
 * @extends {Node}
 * @see {@link SharedStyle}
 * 
 * @property {SharedStyle|undefined} sharedStyle - The shared style used by this style
 * 
 * @example
 * //Get a layer named 'block'
 * const block = sketch.pages[0].get('shapeGroup', 'block');
 *
 * //Get the shared style
 * const sharedStyle = block.style.sharedStyle;
 *
 * //Get a shared style named 'red'
 * const redStyle = sketch.sharedStyles.find(style => style.name === 'red');
 *
 * //Assign a different shared style
 * block.style.sharedStyle = redStyle;
 */
class Style extends Node {
  get sharedStyle() {
    if (this[_sharedstyle]) {
      return this[_sharedstyle];
    }

    const sketch = this.getParent('sketch');

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

  set sharedStyle(sharedStyle) {
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
