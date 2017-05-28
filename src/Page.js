const LayerContainer = require('./LayerContainer');

class Page extends LayerContainer {
  getAllSymbols() {
    return this.layers.filter(layer => layer._class === 'symbolMaster');
  }
}

module.exports = Page;
