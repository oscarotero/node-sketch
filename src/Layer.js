const _class = Symbol.for('Class');
const _parent = Symbol.for('Parent');
const lib = require('../index');

class Layer extends Array {
    constructor(parent, data) {
        super();

        this[_parent] = parent;
        this[_class] = data._class;
        this.data = data;

        if (Array.isArray(data.layers)) {
            data.layers.forEach((layerData) => this.push(lib.create(this, layerData)));
        }
    }

    static get [Symbol.species]() {
        return Array;
    }

    get id() {
        return this.data.do_objectID;
    }

    get name() {
        return this.data.name;
    }

    set name(name) {
        this.data.name = name;
    }

    get type() {
        return this[_class];
    }

    get parent() {
        return this[_parent];
    }

    get width() {
        return this.data.frame.width;
    }

    set width(val) {
        this.data.frame.width = val;
    }

    get height() {
        return this.data.frame.height;
    }

    set height(val) {
        this.data.frame.height = val;
    }

    get x() {
        return this.data.frame.x;
    }

    set x(val) {
        this.data.frame.x = val;
    }

    get y() {
        return this.data.frame.y;
    }

    set y(val) {
        this.data.frame.y = val;
    }

    detach () {
        if (this[_parent]) {
            const index = this[_parent].indexOf(this);

            if (index !== -1) {
                this[_parent].splice(index, 1);
                this[_parent] = null;
            }
        }

        return this;
    }

    push (layer) {
        layer = layer.detach();
        layer[_parent] = this;

        return super.push(layer);
    }

    unshift (layer) {
        layer = layer.detach();
        layer[_parent] = this;

        return super.unshift(layer);
    }

    splice (start, deleteCount, layer) {
        if (!layer) {
            return super.splice(start, deleteCount);
        }

        layer = layer.detach();
        layer[_parent] = this;

        return super.splice(start, deleteCount, layer);
    }

    search(condition) {
        let layer = this.find(condition);

        if (layer) {
            return layer;
        }

        for (let child of this) {
            layer = child.search(condition);

            if (layer) {
                return layer;
            }
        }
    }

    searchAll(condition, result) {
        result = result || [];

        this
            .filter(condition)
            .forEach((layer) => result.push(layer));

        for (let child of this) {
            child.searchAll(condition, result);
        }

        return result;
    }

    searchParent(condition) {
        let parent = this[_parent];

        while (parent && !condition(parent)) {
            parent = parent.parent;
        }

        return parent;
    }

    toString() {
        return JSON.stringify(this.toJson());
    }

    toJson() {
        if (Array.isArray(this.data.layers)) {
            this.data.layers = this.map((layer) => layer.toJson());
        }

        return this.data;
    }
}

module.exports = Layer;
