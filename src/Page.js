const Layer = require('./Layer');
const utils = require('./utils');

class Page extends Layer {
    getSymbols() {
        return utils.mapSymbols(this.searchAll((layer) => layer.type === 'symbolMaster'));
    }
}

Page.type = 'page';

module.exports = Page;
