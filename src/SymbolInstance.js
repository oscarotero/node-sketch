const _symbol = Symbol.for('symbolMaster');
const Layer   = require('./Layer');

module.exports = class SymbolInstance extends Layer {
    constructor(parent, data) {
        super(parent, data);

        if ('overrides' in this) {
            this.overrides = this.overrides.map((override) => {
                throw new Error('TODO');
                return override;
            });
        }
    }

    get symbol() {
        if (this[_symbol]) {
            return this[_symbol];
        }

        //Search in the current page
        let page = this.searchParent((layer) => layer.type === 'page');
        let master = page.getSymbols().find((symbol) => symbol.symbolID === this.symbolID);

        //Search in the Symbols page
        if (!master) {
            page = page.parent.getSymbolsPage();

            if (page) {
                master = page.getSymbols().find((symbol) => symbol.symbolId === this.symbolId);
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
