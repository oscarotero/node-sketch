const _parent = Symbol.for('Parent');
const Style = require('./Style');
const Rect = require('./Rect');
const ExportOptions = require('./ExportOptions');
const lib = require('../index');

module.exports = class Layer {
    constructor(parent, data, extraData) {
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
                resizingType: 0,
                layers: []
            },
            extraData,
            data
        );

        if ('style' in this) {
            this.style = new Style(this.style);
        }

        if ('frame' in this) {
            this.frame = new Rect(this.frame);
        }

        if ('exportOptions' in this) {
            this.exportOptions = new ExportOptions(this.exportOptions);
        }
    }

    static get [Symbol.species]() {
        return Array;
    }

    detach () {
        if (this[_parent]) {
            const index = this[_parent].layers.indexOf(this);

            if (index !== -1) {
                this[_parent].layers.splice(index, 1);
                this[_parent] = null;
            }
        }

        return this;
    }

    push (layer) {
        layer = layer.detach();
        layer[_parent] = this;

        return this.layers.push(layer);
    }

    unshift (layer) {
        layer = layer.detach();
        layer[_parent] = this;

        return this.layers.unshift(layer);
    }

    splice (start, deleteCount, layer) {
        if (!layer) {
            return this.layers.splice(start, deleteCount);
        }

        layer = layer.detach();
        layer[_parent] = this;

        return this.layers.splice(start, deleteCount, layer);
    }

    search(condition) {
        let layer = this.layers.find(condition);

        if (layer) {
            return layer;
        }

        for (let child of this) {
            if ('layers' in child) {
                layer = child.layers.search(condition);

                if (layer) {
                    return layer;
                }
            }
        }
    }

    searchAll(condition, result) {
        result = result || [];

        this.layers
            .filter(condition)
            .forEach((layer) => result.push(layer));

        this.layers.forEach((child) => child.searchAll(condition, result));

        return result;
    }

    searchParent(condition) {
        let parent = this[_parent];

        while (parent && !condition(parent)) {
            parent = parent.parent;
        }

        return parent;
    }
}
