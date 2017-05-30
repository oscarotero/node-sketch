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
  get(type, condition) {
    if (typeof condition === 'string') {
      const name = condition;
      condition = node => node.name === name;
    }

    if (type === 'symbolMaster' || type === 'artboard') {
      return this.layers.find(
        layer => layer._class === type && (!condition || condition(layer))
      );
    }

    return super.get(type, condition);
  }

  /**
   * @inheritdoc
   */
  getAll(type, condition, result) {
    if (typeof condition === 'string') {
      const name = condition;
      condition = node => node.name === name;
    }
    
    if (type === 'symbolMaster' || type === 'artboard') {
      return this.layers.filter(
        layer => layer._class === type && (!condition || condition(layer))
      );
    }

    return super.getAll(type, condition, result);
  }
}

module.exports = Page;
