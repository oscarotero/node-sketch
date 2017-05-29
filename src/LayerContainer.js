const _parent = Symbol.for('Parent');
const Layer = require('./Layer');

/**
 * Abstrac class that extends Layer.
 * It's used as base by all Layers containing other Layers inside (such Page, Artboard, Group, etc)
 *
 * @abstract
 * @extends {Layer}
 */
class LayerContainer extends Layer {
  /**
   * Add a new layer as child of this LayerContainer
   * @example
   * //Get a group named "buttons"
   * const buttons = page.findLayer('group', (group) => group.name === 'buttons');
   *
   * //Add a new button at the end
   * buttons.addLayer(newButton);
   *
   * @param {Layer} layer The Layer to add
   * @param {Number} [position] The 0 based position where the new layer is added. If it's not provided, it will be placed at the end of the stack.
   */
  addLayer(layer, position) {
    layer = layer.detach();
    layer[_parent] = this;

    if (position === undefined) {
      this.layers.push(layer);
    } else {
      this.layers.splice(position, 0, layer);
    }
  }

  /**
   * Search and returns the first descendant layer that match the type and condition.
   * @example
   * //Get the first page
   * const page = sketch.pages[0];
   *
   * //Get the first artboard found in this page
   * const artboard = page.findLayer('artboard');
   *
   * //Get the first artboard named 'home'
   * const artboard = page.findLayer('artboard', (artboard) => artboard.name === 'home');
   *
   * @param  {string} type - The Layer type (ex: "artboard", "group", etc)
   * @param  {Function} [condition] - A callback to be executed on each layer and must return true or false. If it's not provided, only the type argument is be used.
   * @return {Layer|undefined}
   */
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

  /**
   * Search and returns all descendant layers matching with the type and condition.
   * @example
   * //Get the first page
   * const page = sketch.pages[0];
   *
   * //Get all symbolInstances found in this page
   * const instances = page.findAllLayers('symbolInstance');
   *
   * //Get all symbolInstances named 'button'
   * const instances = page.findAllLayers('symbolInstance', (instance) => instance.name === 'button');
   *
   * @param  {string} type - The Layer type (ex: "artboard", "group", etc)
   * @param  {Function} [condition] - A callback to be executed on each layer and must return true or false. If it's not provided, only the type argument is be used.
   * @return {Layer[]}
   */
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
