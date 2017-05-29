const _symbol = Symbol.for('symbolMaster');
const Layer = require('./Layer');

class SymbolInstance extends Layer {
  get symbol() {
    if (this[_symbol]) {
      return this[_symbol];
    }

    //Search in the current page
    let page = this.findParent('page');
    let master = page.findSymbol(symbol => symbol.symbolID === this.symbolID);

    //Search in the Symbols page
    if (!master) {
      page = page.parent.getSymbolsPage();

      if (page) {
        master = page.findSymbol(symbol => symbol.symbolID === this.symbolID);
      }
    }

    this[_symbol] = master;
    return master;
  }

  set symbol(master) {
    this.symbolID = master.symbolID;
    this[_symbol] = master;
  }
}

module.exports = SymbolInstance;
