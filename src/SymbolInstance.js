const _symbol = Symbol.for('symbolMaster');
const Node = require('./Node');

/**
 * Represents the instance of a symbol
 *
 * @property {Node} symbolMaster - The symbolMaster object used by the instance
 *
 * @example
 * //Get any symbol instance
 * const instance = sketch.pages[0].get('symbolInstance', 'button');
 *
 * console.log(`The instance named ${instance.name} belongs to the master symbol ${instance.symbolMaster.name}`);
 *
 * //Get the symbol master named 'new-button'
 * const master = sketch.getSymbolsPage().get('symbolMaster', 'new-button');
 *
 * //Apply the new master to the instance
 * instance.symbolMaster = master;
 *
 * @extends {Node}
 */
class SymbolInstance extends Node {
    get symbolMaster() {
        if (this[_symbol]) {
            return this[_symbol];
        }

        //Search the symbols
        const sketch = this.getSketch();

        if (!sketch) {
            return;
        }

        //Search in the document
        let master = sketch.symbols.find(symbol => symbol.symbolID === this.symbolID);

        //Search in the foreignSymbols
        if (!master) {
            master = sketch.foreignSymbols.find(symbol => symbol.symbolID === this.symbolID);
        }

        this[_symbol] = master;
        return master;
    }

    set symbolMaster(master) {
        this.symbolID = master.symbolID;
        this[_symbol] = master;
    }
}

module.exports = SymbolInstance;
