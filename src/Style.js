const _sharedstyle = Symbol.for('sharedStyle');
const Node = require('./Node');

class Style extends Node {
  getSharedStyle() {
    if (this[_sharedstyle]) {
      return this[_sharedstyle];
    }

    const sketch = this.findParent('sketch');

    let sharedStyle = sketch.findSharedStyle(style => style.do_objectID === this.sharedObjectID);

    if (!sharedStyle) {
      sharedStyle = sketch.findTextStyle(style => style.do_objectID === this.sharedObjectID);
    }

    this[_sharedstyle] = sharedStyle;
    return sharedStyle;
  }

  setSharedStyle(sharedStyle) {
    let clone = new Style(this.parent, JSON.parse(JSON.stringify(sharedStyle.value)));
    clone[_sharedstyle] = sharedStyle;
    clone.sharedObjectID = sharedStyle.do_objectID;
    this.parent.style = clone;
  }
}

module.exports = Style;
