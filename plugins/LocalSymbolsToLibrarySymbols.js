const lib = require('../');
const path = require('path');

/**
 * Plugin to replace local symbols with foreign symbols (from libraries)
 * This fixes the copy/paste symbols from one document to another.
 *
 * @alias module:plugins.LocalSymbolsToLibrarySymbols
 * @example
 * sketch.use(new LocalSymbolsToLibrarySymbols([
 *   'path/to/libraries/buttons.sketch',
 *   'path/to/libraries/icons.sketch',
 * ]));
 */
class LocalSymbolsToLibrarySymbols {
    /**
     * @constructor
     *
     * @param {array} libraries Filepath of the sketch file with the symbols
     */
    constructor(libraries) {
        this.libraries = libraries;
    }

    run(sketch) {
        return lib.read(this.libraries)
            .then(sketches => {
                const library = [];

                sketches.forEach((sketch, index) => {
                    const sourceLibraryName = path.basename(this.libraries[index], '.sketch');
                    const libraryID = sketch.document.do_objectID;

                    sketch.localSymbols.forEach(symbol => {
                        library.push({
                            symbolMaster: symbol,
                            libraryID: libraryID,
                            sourceLibraryName: sourceLibraryName
                        });
                    });
                });

                return library;
            })
            .then(library => {
                //Collect all symbols
                sketch.localSymbols.forEach(master => {
                    const libSymbol = library.find(symbol => symbol.symbolMaster.name === master.name);

                    if (libSymbol) {
                        sketch.document.push('foreignSymbols', {
                            _class: 'MSImmutableForeignSymbol',
                            libraryID: libSymbol.libraryID,
                            originalMaster: libSymbol.symbolMaster.toJson(),
                            symbolMaster: master.toJson(),
                            sourceLibraryName: libSymbol.sourceLibraryName
                        });

                        master.detach();
                    }
                });

                const symbolsPage = sketch.symbolsPage;

                if (symbolsPage && symbolsPage.layers.length === 0) {
                    symbolsPage.detach();
                }
            });
    }
}

module.exports = LocalSymbolsToLibrarySymbols;
