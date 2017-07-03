const _parent = Symbol.for('Parent');
const lib = require('../');
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
        const data = JSON.parse(JSON.stringify(this));

        return lib.create(parent || this.parent, data);
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
