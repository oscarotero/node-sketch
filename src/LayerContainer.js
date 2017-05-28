const _parent = Symbol.for('Parent');
const Layer = require('./Layer');

class LayerContainer extends Layer {
  addLayer(layer, position) {
    layer = layer.detach();
    layer[_parent] = this;

    if (position === undefined) {
      this.layers.push(layer);
    } else {
      this.layers.splice(position, 0, layer);
    }
  }

  findLayer(type, condition) {
    let layer = this.layers.find(
      layer => layer._class === type && (!condition || condition(layer))
    );

    if (layer) {
      return layer;
    }

    for (let child of this) {
      if ('layers' in child) {
        layer = child.layers.findLayer(type, condition);

        if (layer) {
          return layer;
        }
      }
    }
  }

  findAllLayers(type, condition, result) {
    result = result || [];

    this.layers
      .filter(
        layer => layer._class === type && (!condition || condition(layer))
      )
      .forEach(layer => result.push(layer));

    this.layers
      .filter(layer => layer instanceof LayerContainer)
      .forEach(layer => layer.findAllLayers(type, condition, result));

    return result;
  }
}

module.exports = LayerContainer;
