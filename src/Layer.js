const Node    = require('./Node');

class Layer extends Node {

    get id () {
        return this.do_objectID;
    }

    detach () {
        if (this.parent) {
            const index = this.parent.layers.indexOf(this);

            if (index !== -1) {
                this.parent.layers.splice(index, 1);
            }
        }

        this.parent = null;

        return this;
    }

    searchParent(condition) {
        let parent = this.parent;

        while (parent && !condition(parent)) {
            parent = parent.parent;
        }

        return parent;
    }
}

module.exports = Layer;
