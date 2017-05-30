const Node = require('./Node');

/**
 * Represents a Page
 *
 * @extends {Node}
 */
class Page extends Node {
  /**
   * Removes the page
   * @example
   * //Remove the first page
   * const firstpage = sketch.pages[0].detach();
   *
   * @return {Page} The page itself
   */
  detach() {
    const sketch = this.parent;

    if (sketch) {
      const index = sketch.pages.findIndex(page => page === this);

      if (index !== -1) {
        sketch.pages.splice(index, 1);
      }
    }

    return this;
  }

  /**
   * @inheritdoc
   */
  find(type, condition) {
    if (type === 'symbolMaster' || type === 'artboard') {
      return this.layers.find(
        layer => layer._class === type && (!condition || condition(layer))
      );
    }

    return super.find(type, condition);
  }

  /**
   * @inheritdoc
   */
  findAll(type, condition, result) {
    if (type === 'symbolMaster' || type === 'artboard') {
      return this.layers.filter(
        layer => layer._class === type && (!condition || condition(layer))
      );
    }

    return super.findAll(type, condition, result);

    result = result || [];

    const classType = getClassType(type);

    if (classType === 'layer') {
      return findLayer(this, type, condition, result);
    }

    return findNode(this, type, condition, result);
  }
}

module.exports = Page;
