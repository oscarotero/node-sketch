const lib = require('../');
const path = require('path');

/**
 * Plugin to copy foreign symbols (libraries) to local symbols
 *
 * @alias module:plugins.LibrarySymbolsToLocalSymbols
 * @example
 * sketch.use(new LibrarySymbolsToLocalSymbols());
 */
class LibrarySymbolsToLocalSymbols {
    run(sketch) {
        const symbolsPage = sketch.symbolsPage;

        sketch.symbols.forEach(symbol => symbolsPage.push('layers', symbol));
        sketch.document.foreignSymbols = [];
    }
}

module.exports = LibrarySymbolsToLocalSymbols;
