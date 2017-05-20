const _symbol = Symbol.for('symbolMaster');
const Layer = require('./Layer');

class SymbolInstance extends Layer {
	get symbolId() {
        return this.data.symbolID;
    }

    set symbolId(id) {
        this.data.symbolID = id;
        this[_symbol] = null;
    }

    get symbol() {
        if (this[_symbol]) {
            return this[_symbol];
        }

        //Search in the current page
        let page = this.searchParent((layer) => layer.type === 'page');
        let master = page.searchSymbol((symbol) => symbol.symbolId === this.symbolId);

        //Search in the Symbols page
        if (!master) {
            page = page.parent.getSymbolsPage();

            if (page) {
                master = page.searchSymbol((symbol) => symbol.symbolId === this.symbolId);
            }
        }

        this[_symbol] = master;
        return master;
    }

    set symbol(master) {
        this.symbolId = master.symbolId;
        this[_symbol] = master;
    }
}

SymbolInstance.type = 'symbolInstance';

module.exports = SymbolInstance;
