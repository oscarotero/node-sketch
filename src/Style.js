const _style = Symbol.for('sharedStyle');
const Node = require('./Node');

class Style extends Node {
  get sharedStyle() {
    if (this[_style]) {
      return this[_style];
    }

    const sketch = this.findParent('sketch');
    const sharedStyle = sketch.findSharedStyle(style => style.do_objectID === this.sharedObjectID);

    this[_style] = sharedStyle;
    return sharedStyle;
  }

  set sharedStyle(sharedStyle) {
    let clone = new Style(this.parent, JSON.parse(JSON.stringify(sharedStyle.value)));
    clone[_style] = sharedStyle;
    clone.sharedObjectID = sharedStyle.do_objectID;
    this.parent.style = clone;
  }
}

module.exports = Style;
