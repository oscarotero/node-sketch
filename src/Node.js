const _parent = Symbol.for('Parent');
const lib = require('../');

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
   * @param  {Object} data - The raw data of the sketch file
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
   * The parent of the node
   * @readonly
   * @type {Node|Sketch}
   */
  get parent() {
    return this[_parent];
  }

  /**
   * The node's id. It's a shortcut of do_objectID.
   * @readonly
   * @type {String}
   */
  get id() {
    return this.do_objectID;
  }

  /**
   * Find a node ascendent matching with the type and condition
   *
   * @param  {String} type - The node type
   * @param  {Function} [condition] - A callback to be executed on each parent and must return true or false. If it's not provided, only the type argument is be used.
   * @return {Node|Sketch|undefined}
   */
  findParent(type, condition) {
    let parent = this[_parent];

    while (parent) {
      if (parent._class === type && (!condition || condition(parent))) {
        return parent;
      }

      parent = parent[_parent];
    }
  }

  /**
   * Search and returns the first descendant node that match the type and condition.
   * @example
   * //Get the first page
   * const page = sketch.pages[0];
   *
   * //Get the first Style found in this page
   * const artboard = page.find('layoutGrid');
   *
   * @param  {string} type - The Node type
   * @param  {Function} [condition] - A callback to be executed on each node that must return true or false. If it's not provided, only the type argument is be used.
   * @return {Node|undefined}
   */
  find(type, condition) {
    const classType = getClassType(type);

    if (classType === 'layer') {
      return findLayer(this, type, condition);
    }

    return findNode(this, type, condition);
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
   * @param  {string} type - The Node type
   * @param  {Function} [condition] - A callback to be executed on each node that must return true or false. If it's not provided, only the type argument is be used.
   * @return {Node[]}
   */
  findAll(type, condition, result) {
    result = result || [];

    const classType = getClassType(type);

    if (classType === 'layer') {
      return findLayer(this, type, condition, result);
    }

    return findNode(this, type, condition, result);
  }
}

module.exports = Node;

function getClassType(type) {
  const contructor = lib.getClass(type);

  return contructor._classType || null;
}

function findNode(target, type, condition, result) {
  for (let [key, value] of Object.entries(target)) {
    if (
      value instanceof Node &&
      value._class === type &&
      (!condition || condition(value))
    ) {
      if (result) {
        result.push(value);
      } else {
        return value;
      }
    }

    if (Array.isArray(value)) {
      for (let child of value) {
        if (child instanceof Node) {
          if (child._class === type && (!condition || condition(child))) {
            if (result) {
              result.push(child);
            } else {
              return child;
            }
          }

          if (result) {
            findNode(child, type, condition, result);
          } else {
            const found = findNode(child, type, condition);

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

function findLayer(target, type, condition, result) {
  if (result) {
    target.layers
      .filter(
        layer => layer._class === type && (!condition || condition(layer))
      )
      .forEach(layer => result.push(layer));
  } else {
    let layer = this.layers.find(
      layer => layer._class === type && (!condition || condition(layer))
    );

    if (layer) {
      return layer;
    }
  }

  for (let [key, value] of Object.entries(target.layers)) {
    if ('layers' in value) {
      if (result) {
        findLayer(value, type, condition, result);
      } else {
        const found = findLayer(value, type, condition);

        if (found) {
          return found;
        }
      }
    }
  }

  return result;
}
