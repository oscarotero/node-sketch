const Layer = require('./Layer');
const RulerData = require('./RulerData');
const lib = require('../');

module.exports = class SymbolMaster extends Layer {
    constructor(parent, data) {
        super(parent, data, {
            _class: 'symbolMaster',
            resizingConstraint: 63,
            rotation: 0,
            includeInCloudUpload: true,
            hasBackgroundColor: false,
            includeBackgroundColorInstance: true,
            resizesContent: false,
            symbolID: null,
            changeIdentifier: null
        });

        this.horizontalRulerData = new RulerData(this.horizontalRulerData);
        this.verticalRulerData = new RulerData(this.verticalRulerData);
        this.layers = this.layers.map((layer) => createChild(layer));

        if ('overrides' in this) {
            this.overrides = this.overrides.map((override) => {
                throw new Error('TO-DO');
                return override;
            });
        }
    }
}

function createChild(layer) {
    const child = lib.create(this, layer);

    if (!child instanceof Layer) {
        throw new Error('Invalid data: ' + layer);
    }

    return child;
}
