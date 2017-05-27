const Layer = require('./Layer');
const Shape = require('./Shape');
const lib = require('../');

module.exports = class ShapeGroup extends Layer {
    constructor(parent, data) {
        super(parent, data, {
            _class: 'shapeGroup',
            resizingConstraint: 63,
            rotation: 0,
            hasClickThrough: false
        });

        this.layers = this.layers.map((layer) => createChild(layer));
    }
}

function createChild(layer) {
    const child = lib.create(this, layer);

    if (!child instanceof Shape) {
        throw new Error('Invalid data: ' + layer);
    }

    return child;
}
