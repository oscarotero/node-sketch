const Layer = require('./Layer');
const utils = require('./utils');

class Page extends Layer {
    getSymbols() {
        return utils.mapSymbols(this.filter((layer) => layer.type === 'symbolMaster'));
    }

    searchSymbol(condition) {
        return this.find((layer) => layer.type === 'symbolMaster' && condition(layer));
    }
}

module.exports = Page;
