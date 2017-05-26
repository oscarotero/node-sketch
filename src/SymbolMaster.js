const Layer = require('./Layer');
const RulerData = require('./RulerData');

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

        if ('overrides' in this) {
            this.overrides = this.overrides.map((override) => {
                throw new Error('TO-DO');
                return override;
            });
        }
    }
}
