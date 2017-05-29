const LayerContainer = require('./LayerContainer');

/**
 * Represents a Page
 *
 * @extends {LayerContainer}
 */
class Page extends LayerContainer {

  /**
   * Search and returns one SymbolMaster stored in this page.
   *
   * @example
   * //Get the page that contains the symbols
   * const page = sketch.getSymbolsPage();
   *
   * //Find a symbol named 'button'
   * const button = page.findSymbolMaster((symbol) => symbol.name === 'button');
   *
   * @param  {Function} [condition] - A callback to be executed on each value and must return true or false.
   * @return {SymbolMaster|undefined}
   */
  findSymbolMaster(condition) {
    return this.layers.find(
      layer =>
        layer._class === 'symbolMaster' && (!condition || condition(layer))
    );
  }

  /**
   * Search and returns all SymbolMaster stored in this page.
   *
   * @example
   * //Get the page containing the symbols
   * const page = sketch.getSymbolsPage();
   *
   * //Get all symbols in this page
   * const allSymbols = page.findAllSymbolMasters();
   *
   * //Get only the symbols starting with 'button/'
   * const buttonSymbols = page.findAllSymbolMasters((symbol) => symbol.name.startsWith('button/'));
   *
   * @param  {Function} [condition] - A callback to be executed on each value and must return true or false. If it's not provided, returns all symbols.
   * @return {SymbolMaster[]}
   */
  findAllSymbolMasters(condition) {
    return this.layers.filter(
      layer =>
        layer._class === 'symbolMaster' && (!condition || condition(layer))
    );
  }
}

module.exports = Page;
