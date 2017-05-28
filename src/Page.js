const LayerContainer = require('./LayerContainer');
const RulerData      = require('./RulerData');

module.exports = class Page extends LayerContainer {
    constructor(parent, data) {
        super(parent, data);

        this.horizontalRulerData = new RulerData(this.horizontalRulerData);
        this.verticalRulerData = new RulerData(this.verticalRulerData);
    }

    getSymbols() {
        return this.layers.filter((layer) => layer.type === 'symbolMaster');
    }
}
