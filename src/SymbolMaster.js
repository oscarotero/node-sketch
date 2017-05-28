const LayerContainer = require('./LayerContainer');
const RulerData = require('./RulerData');

module.exports = class SymbolMaster extends LayerContainer {
    constructor(parent, data) {
        super(parent, data);

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
