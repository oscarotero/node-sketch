const Layer = require('./Layer');

class SymbolMaster extends Layer {
    get symbolId() {
        return this.data.symbolID;
    }
}

SymbolMaster.type = 'symbolMaster';

module.exports = SymbolMaster;
