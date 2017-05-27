const Layer = require('./Layer');
const Color = require('./Color');
const RulerData = require('./RulerData');
const lib = require('../');

module.exports = class Artboard extends Layer {
    constructor(parent, data) {
        super(parent, data, {
            _class: 'artboard',
            resizingConstraint: 63,
            rotation: 0,
            layerListExpandedType: 2,
            hasClickThrough: true,
            hasBackgroundColor: false,
            includeBackgroundColorInExport: true,
            includeInCloudUpload: true,
            resizesContent: false
        });

        if ('backgroundColor' in this) {
            this.backgroundColor = new Color(this.backgroundColor);
        }

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
