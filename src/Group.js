const Layer = require('./Layer');

module.exports = class Group extends Layer {
    constructor(parent, data) {
        super(parent, data, {
            _class: 'group'
        });

        this.layers = this.layers.map((layer) => createChild(layer));
    }
}

function createChild(layer) {
    const child = lib.create(this, layer);

    if (!child instanceof Layer) {
        throw new Error('Invalid data: ' + layer);
    }

    return child;
}
