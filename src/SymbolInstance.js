const _symbol = Symbol.for('symbolMaster');
const Layer = require('./Layer');

/**
 * Represents the instance of a symbol
 *
 * @extends {Layer}
 * @see {@link SymbolMaster}
 */
class SymbolInstance extends Layer {
  /**
   * Search and returns the SymbolMaster node of the instance
   * @example
   * //Search any symbol instance
   * const instance = sketch.pages[0].findLayer('symbolInstance');
   *
   * //Get the symbol master
   * const master = instance.getSymbolMaster();
   *
   * console.log(`The instance named ${instance.name} belongs to the master symbol ${master.name}`);
   *
   * @return {SymbolMaster}
   */
  getSymbolMaster() {
    if (this[_symbol]) {
      return this[_symbol];
    }

    //Search in the current page
    let page = this.findParent('page');
    let master = page.findSymbolMaster(symbol => symbol.symbolID === this.symbolID);

    //Search in the Symbols page
    if (!master) {
      page = page.parent.getSymbolsPage();

      if (page) {
        master = page.findSymbolMaster(symbol => symbol.symbolID === this.symbolID);
      }
    }

    this[_symbol] = master;
    return master;
  }

  /**
   * Assign a new symbol master to the instance
   * @example
   * //Get any symbol instance
   * const instance = sketch.pages[0].findLayer('symbolInstance', instance => instance.name === 'button');
   *
   * //Get the symbol master named 'new-button'
   * const master = sketch.getSymbolsPage().findSymbolMaster(symbol => symbol.name === 'new-button');
   *
   * //Apply the new master to the instance
   * instance.setSymbolMaster(master);
   *
   * @param {SymbolMaster} master
   */
  setSymbolMaster(master) {
    this.symbolID = master.symbolID;
    this[_symbol] = master;
  }
}

module.exports = SymbolInstance;
