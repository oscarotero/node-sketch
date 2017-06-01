const Node = require('./Node');

/**
 * Represents a Page
 *
 * @extends {Node}
 */
class Page extends Node {

  /**
   * @inheritdoc
   */
  get(type, condition) {
    if (type === 'symbolMaster' || type === 'artboard') {
      return this.layers.find(getCondition(type, condition));
    }

    return super.get(type, condition);
  }

  /**
   * @inheritdoc
   */
  getAll(type, condition, result) {
    if (type === 'symbolMaster' || type === 'artboard') {
      return this.layers.filter(getCondition(type, condition));
    }

    return super.getAll(type, condition, result);
  }
}

module.exports = Page;

function getCondition (type, condition) {
  if (!condition) {
    return node => node._class === type;
  }

  if (typeof condition === 'string') {
    return node => node._class === type && node.name === condition;
  }

  return node => node._class === type && condition(node);
}