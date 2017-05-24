const _parent = Symbol.for('Parent');
const lib = require('../index');

module.exports = class Layer extends Array {
    constructor(parent, data, extraData) {
        super();

        this[_parent] = parent;

        Object.assign(this,
            {
                _class: null,
                do_objectID: null,
                name: '',
                nameIsFixed: false,
                isVisible: true,
                isLocked: false,
                layerListExpandedType: null,
                hasClickThrough: null,
                isFlippedHorizontal: false,
                isFlippedVertical: false,
                rotation: 0,
                shouldBreakMaskChain: false,
                resizingType: 0
            },
            extraData,
            data
        );

        if ('style' in data) {
            //this.style = new Style(data.style);
        }
        if (Array.isArray(data.layers)) {
            data.layers.forEach((layerData) => this.push(lib.create(this, layerData)));
        }
    }

    static get [Symbol.species]() {
        return Array;
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
