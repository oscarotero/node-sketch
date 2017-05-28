const Layer = require('./Layer');

class LayerContainer extends Layer {
  addLayer(layer, position) {
    layer = layer.detach();
    layer.parent = this;

    if (position === undefined) {
      this.layers.push(layer);
    } else {
      this.layers.splice(position, 0, layer);
    }
  }

  searchLayer(condition) {
    let layer = this.layers.find(condition);

    if (layer) {
      return layer;
    }

    for (let child of this) {
      if ('layers' in child) {
        layer = child.layers.searchLayer(condition);

        if (layer) {
          return layer;
        }
      }
    }
  }

  searchLayers(condition, result) {
    result = result || [];

    this.layers.filter(condition).forEach(layer => result.push(layer));

    this.layers
      .filter(layer => layer instanceof LayerContainer)
      .forEach(child => child.searchLayers(condition, result));

    return result;
  }
}

module.exports = LayerContainer;
