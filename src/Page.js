const LayerContainer = require('./LayerContainer');

class Page extends LayerContainer {
  findSymbolMaster(condition) {
    return this.layers.find(
      layer =>
        layer._class === 'symbolMaster' && (!condition || condition(layer))
    );
  }

  findAllSymbolMasters(condition) {
    return this.layers.filter(
      layer =>
        layer._class === 'symbolMaster' && (!condition || condition(layer))
    );
  }
}

module.exports = Page;
