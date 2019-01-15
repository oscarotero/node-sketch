const _parent = Symbol.for('Parent');
const lib = require('../');
const Sketch = require('./Sketch');
const layers = {
    classes: [
        'artboard',
        'bitmap',
        'group',
        'oval',
        'page',
        'polygon',
        'rectangle',
        'shapeGroup',
        'shapePath',
        'slice',
        'star',
        'symbolInstance',
        'symbolMaster',
        'text',
        'triangle'
    ],
    page: ['symbolMaster', 'artboard']
};

/**
 * Abstract class that it's used by all other classes, providing basic functionalities.
 *
 * @abstract
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

        Object.keys(data).forEach(key => this.set(key, data[key]));
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
     * Get the sketch element associated with this node
     *
     * @return {Sketch|undefined}
     */
    getSketch() {
        let parent = this;

        while (parent[_parent]) {
            parent = parent[_parent];
        }

        if (parent instanceof Sketch) {
            return parent;
        }
    }

    /**
     * Add/replace new childrens in this node
     * @param {string} key  The node key
     * @param {Node|Object|Array} node The node/s to insert
     */
    set(key, node) {
        if (node instanceof Node) {
            node = node.toJson();
        }

        if (isPlainObject(node)) {
            //is a subclass
            if ('_class' in node) {
                this[key] = lib.create(this, node);
                return;
            }

            this[key] = {};

            Object.keys(node).forEach(k => {
                if (isClassObject(node[k])) {
                    this[key][k] = lib.create(this, node[k]);
                } else {
                    this[key][k] = node[k];
                }
            });
            return;
        }

        //is an array of subclasses
        if (Array.isArray(node) && isClassObject(node[0])) {
            this[key] = node.map(child => lib.create(this, child));
            return;
        }

        this[key] = node;
    }

    /**
     * Push a new children in this node
     * @param {string} key The node key
     * @param {Node|Object} node The node/s to insert
     *
     * @return {Node} The new node inserted
     */
    push(key, node) {
        if (node instanceof Node) {
            node = node.toJson();
        }

        if (!Array.isArray(this[key])) {
            throw new Error(`Unable to push new children. ${key} must be an array`);
        }

        //is a subclass
        if (isClassObject(node)) {
            node = lib.create(this, node);
        }

        this[key].push(node);

        return node;
    }

    /**
     * Search and returns the first descendant node that match the type and condition.
     *
     * @param  {String} type - The Node type
     * @param  {Function|String} [condition] - The node name or a callback to be executed on each node that must return true or false. If it's not provided, only the type argument is be used.
     * @return {Node|undefined}
     */
    get(type, condition) {
        //page has always as direct children artboard and symbolMasters
        if (layers[this._class] && layers[this._class].indexOf(type) !== -1) {
            return this.layers.find(getCondition(type, condition));
        }

        if (layers.classes.indexOf(type) === -1) {
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
     * const colors = page.getAll('color');
     *
     * //Get all colors with specific values
     * const blueColors = page.getAll('color', (color) => {
     *  return color.blue > 0.5 && color.red < 0.33
     * });
     *
     * @param  {String} type - The Node type
     * @param  {Function|String} [condition] - The node name or a callback to be executed on each node that must return true or false. If it's not provided, only the type argument is be used.
     * @return {Node[]}
     */
    getAll(type, condition, result) {
        //page has always as direct children artboard and symbolMasters
        if (layers[this._class] && layers[this._class].indexOf(type) !== -1) {
            return this.layers.filter(getCondition(type, condition));
        }

        result = result || [];

        if (layers.classes.indexOf(type) === -1) {
            return findNode(this, getCondition(type, condition), result);
        }

        return findLayer(this, getCondition(type, condition), result);
    }

    /**
     * Removes the node from its parent
     *
     * @return {Node}
     */
    detach() {
        const parent = this[_parent];
        this[_parent] = undefined;

        if (!parent) {
            throw new Error('Unable to detach a node without parent');
        }

        for (let [key, value] of Object.entries(parent)) {
            if (value === this) {
                parent[key] = undefined;
                return this;
            }

            if (Array.isArray(value)) {
                const index = value.indexOf(this);

                if (index !== -1) {
                    value.splice(index, 1);
                    return this;
                }
            }
        }

        throw new Error('Unable to detach a node with incorrect parent');
    }

    /**
     * Replace this node with other
     *
     * @param {Node} node - The node to use
     *
     * @return {Node} The new node
     */
    replaceWith(node) {
        const parent = this[_parent];

        if (!parent) {
            throw new Error('Unable to replace a node without parent');
        }

        node[_parent] = parent;

        for (let [key, value] of Object.entries(parent)) {
            if (value === this) {
                parent[key] = node;
                return node;
            }

            if (Array.isArray(value)) {
                const index = value.indexOf(this);

                if (index !== -1) {
                    value[index] = node;
                    return node;
                }
            }
        }

        throw new Error('Unable to replace a node with incorrect parent');
    }

    /**
     * Creates a deep clone of this node
     *
     * @param {Node|undefined} parent - The new parent of the clone. If it's not defined use the current parent.
     *
     * @return {Node}
     */
    clone(parent) {
        return lib.create(parent || this.parent, this.toJson());
    }

    /**
     * Returns a json with the node data
     *
     * @return {Object}
     */
    toJson() {
        return JSON.parse(JSON.stringify(this));
    }
}

module.exports = Node;

function getCondition(type, condition) {
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
        if (value instanceof Node) {
            if (!condition || condition(value)) {
                if (result) {
                    result.push(value);
                    continue;
                }

                return value;
            }

            if (result) {
                findNode(value, condition, result);
                continue;
            }

            const found = findNode(value, condition);

            if (found) {
                return found;
            }

            continue;
        }

        if (Array.isArray(value)) {
            for (let child of value) {
                if (child instanceof Node) {
                    if (!condition || condition(child)) {
                        if (result) {
                            result.push(child);
                            continue;
                        }

                        return child;
                    }

                    if (result) {
                        findNode(child, condition, result);
                        continue;
                    }

                    const found = findNode(child, condition);

                    if (found) {
                        return found;
                    }
                }
            }

            continue;
        }

        if (isPlainObject(value)) {
            if (result) {
                findNode(value, condition, result);
                continue;
            }

            const found = findNode(value, condition);

            if (found) {
                return found;
            }
        }
    }

    return result;
}

function findLayer(target, condition, result) {
    if (result) {
        target.layers.filter(layer => !condition || condition(layer)).forEach(layer => result.push(layer));
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

//https://stackoverflow.com/a/38555871
function isPlainObject(obj) {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        obj.constructor === Object &&
        Object.prototype.toString.call(obj) === '[object Object]'
    );
}

function isClassObject(obj) {
    return isPlainObject(obj) && '_class' in obj;
}
