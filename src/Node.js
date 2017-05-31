const _parent = Symbol.for('Parent');
const lib = require('../');
const layerClasses = ['artboard', 'bitmap', 'group', 'oval', 'page', 'polygon', 'rectangle', 'shapeGroup', 'shapePath', 'slice', 'star', 'symbolInstance', 'symbolMaster', 'text', 'triangle'];

/**
 * Abstract class that it's used by all other classes, providing basic functionalities.
 *
 * @abstract
 * @ignore
 */
class Node {
  /**
   * @constructor
   *
   * @param  {Node|Sketch} parent - The parent of the element
   * @param  {Object} data - The raw data from the sketch file
   */
  constructor(parent, data) {
    this[_parent] = parent;

    Object.keys(data).forEach(key => {
      //is a subclass
      if (typeof data[key] === 'object' && '_class' in data[key]) {
        this[key] = lib.create(this, data[key]);
        return;
      }

      //is an array of subclasses
      if (
        Array.isArray(data[key]) &&
        typeof data[key][0] === 'object' &&
        '_class' in data[key][0]
      ) {
        this[key] = data[key].map(child => lib.create(this, child));
        return;
      }

      this[key] = data[key];
    });
  }

  /**
   * Returns the parent element
   *
   * @return {Node|Sketch|undefined}
   */
  get parent() {
    return this[_parent];
  }

  /**
   * Find a node ascendent matching with the type and condition
   *
   * @param  {String} [type] - The node type
   * @param  {Function|String} [condition] - The node name or a callback to be executed on each parent and must return true or false. If it's not provided, only the type argument is be used.
   * @return {Node|Sketch|undefined}
   */
  getParent(type, condition) {
    let parent = this[_parent];

    condition = getCondition(type, condition);

    if (!condition) {
      return parent;
    }

    while (parent && !condition(parent)) {
      parent = parent[_parent];
    }

    return parent;
  }

  /**
   * Search and returns the first descendant node that match the type and condition.
   *
   * @param  {String} type - The Node type
   * @param  {Function|String} [condition] - The node name or a callback to be executed on each node that must return true or false. If it's not provided, only the type argument is be used.
   * @return {Node|undefined}
   */
  get(type, condition) {
    if (layerClasses.indexOf(type) === -1) {
      return findNode(this, getCondition(type, condition));
    }

    return findLayer(this, getCondition(type, condition));
  }

  /**
   * Search and returns all descendant nodes matching with the type and condition.
   * @example
   * //Get the first page
   * const page = sketch.pages[0];
   *
   * //Get all colors found in this page
   * const colors = page.findAll('color');
   *
   * //Get all colors with specific values
   * const blueColors = page.findAll('color', (color) => {
   *  return color.blue > 0.5 && color.red < 0.33
   * });
   *
   * @param  {String} type - The Node type
   * @param  {Function|String} [condition] - The node name or a callback to be executed on each node that must return true or false. If it's not provided, only the type argument is be used.
   * @return {Node[]}
   */
  getAll(type, condition, result) {
    result = result || [];

    if (layerClasses.indexOf(type) === -1) {
      return findNode(this, getCondition(type, condition), result);
    }

    return findLayer(this, getCondition(type, condition), result);
  }

  /**
   * Removes this node from parent
   * 
   * @return {Node}
   */
  detach() {
    if (this[_parent]) {
      if (layerClasses.indexOf(this._class) !== -1) {
        const index = this.parent.layers.indexOf(this);

        if (index !== -1) {
          this[_parent].layers.splice(index, 1);
        }

        this[_parent] = null;
      
        return this;
      }

      throw new Error('To-do');
    }

    return this;
  }
}

module.exports = Node;

function getCondition (type, condition) {
  if (!type) {
    return false;
  }

  if (typeof type === 'function') {
    return type;
  }

  if (!condition) {
    return node => node._class === type;
  }

  if (typeof condition === 'string') {
    return node => node._class === type && node.name === condition;
  }

  return node => node._class === type && condition(node);
}

function findNode(target, condition, result) {
  for (let [key, value] of Object.entries(target)) {
    if (value instanceof Node && (!condition || condition(value))) {
      if (result) {
        result.push(value);
      } else {
        return value;
      }
    }

    if (Array.isArray(value)) {
      for (let child of value) {
        if (child instanceof Node) {
          if (!condition || condition(child)) {
            if (result) {
              result.push(child);
            } else {
              return child;
            }
          }

          if (result) {
            findNode(child, condition, result);
          } else {
            const found = findNode(child, condition);

            if (found) {
              return found;
            }
          }
        }
      }
    }
  }

  return result;
}

function findLayer(target, condition, result) {
  if (result) {
    target.layers
      .filter(layer => !condition || condition(layer))
      .forEach(layer => result.push(layer));
  } else {
    let layer = target.layers.find(layer => !condition || condition(layer));

    if (layer) {
      return layer;
    }
  }

  for (let [key, value] of Object.entries(target.layers)) {
    if ('layers' in value) {
      if (result) {
        findLayer(value, condition, result);
      } else {
        const found = findLayer(value, condition);

        if (found) {
          return found;
        }
      }
    }
  }

  return result;
}
