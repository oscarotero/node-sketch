const lib = require('../');

/**
 * Plugin to import pages and artboards from external sketch files.
 * This fixes some issues in sketch on copy/paste artboards containing symbols.
 * It only imports pages and artboards not existing in the destination sketch (with the same name)
 * It also imports the library symbols used
 *
 * @alias module:plugins.ImportArtboards
 * @example
 * sketch.use(new ImportArtboards('path/to/source.sketch'));
 */
class ImportArtboards {
    /**
     * @constructor
     *
     * @param {string} source Path to the sketch file containing the pages to import
     */
    constructor(source) {
        this.source = source;
    }

    run(sketch) {
        return lib.read(this.source)
            .then(source => {
                source.pages.forEach(srcPage => {
                    const page = sketch.pages.find(page => page.name === srcPage.name);

                    if (page) {
                        const offsetY = getOffsetY(page, srcPage) + 50;

                        srcPage.layers.forEach(srcLayer => {
                            const layer = page.layers.find(layer => layer.name === srcLayer.name);

                            if (!layer) {
                                page.push('layers', srcLayer).frame.y += offsetY;
                            }
                        });
                    } else {
                        sketch.pages.push(srcPage);
                    }
                });

                //Import foreign symbols
                const foreignSymbols = sketch.foreignSymbols;

                source.foreignSymbols.forEach(symbol => {
                    const existing = foreignSymbols.find(fs => fs.symbolID === symbol.symbolID);

                    if (!existing) {
                        sketch.document.push('foreignSymbols', symbol.parent);
                    }
                });
            });
    }
}

function getOffsetY(page, srcPage) {
    let pageY = 0, srcPageY;

    page.layers.forEach(layer => {
        const y = layer.frame.y + layer.frame.height;

        if (y > pageY) {
            pageY = y;
        }
    });

    srcPage.layers.forEach(layer => {
        const y = layer.frame.y;

        if (srcPageY === undefined) {
            srcPageY = y;
        } else if (srcPageY > y) {
            srcPageY = y;
        }
    });

    return pageY - srcPageY;
}

module.exports = ImportArtboards;
