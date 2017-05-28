const _parent       = Symbol.for('Parent');
const Node          = require('./Node');
const ExportOptions = require('./ExportOptions');
const Rect          = require('./Rect');

module.exports = class Layer extends Node {
    constructor(parent, data) {
        super(data);

        this[_parent] = parent;
        this.exportOptions = new ExportOptions(this.exportOptions);
        this.frame = new Rect(this.frame);
    }

    get id () {
        return this.do_objectID;
    }

    get parent () {
        return this[_parent];
    }

    set parent (parent) {
        this[_parent] = parent;
    }

    detach () {
        if (this[_parent]) {
            const index = this[_parent].layers.indexOf(this);

            if (index !== -1) {
                this[_parent].layers.splice(index, 1);
            }
        }

        this[_parent] = null;

        return this;
    }

    searchParent(condition) {
        let parent = this[_parent];

        while (parent && !condition(parent)) {
            parent = parent.parent;
        }

        return parent;
    }
}
