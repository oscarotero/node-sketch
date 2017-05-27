const Layer = require('./Layer');
const RulerData = require('./RulerData');
const lib = require('../');

module.exports = class Page extends Layer {
    constructor(parent, data) {
        super(parent, data, {
            _class: 'page',
            resizingConstraint: 0,
            rotation: 0,
            layerListExpandedType: 0,
            hasClickThrough: true
        });

        this.horizontalRulerData = new RulerData(this.horizontalRulerData);
        this.verticalRulerData = new RulerData(this.verticalRulerData);
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
