const fs = require('fs');
const path = require('path');
const lib = require('../');

/**
 * This class represents the sketch file and all this content.
 *
 * @property {JSZip} repo - The instance of JSZip containing the raw data
 * @property {Node} document - The document data
 * @property {Node} meta - The meta data
 * @property {Node} user - The user data
 * @property {Page[]} pages - Array with all pages of the document
 * @property {Page|undefined} symbolsPage - The "Symbols" page if exists
 * @property {Node[]} symbols - Array with all local symbols (symbols stored in any page of the document)
 * @property {Node[]} foreignSymbols - Array with all foreign symbols used in the document (symbols loaded from libraries)
 * @property {SharedStyle[]} layerStyles - Array with all shared styles of the document
 * @property {SharedStyle[]} foreignLayerStyles - Array with all shared styles used and loaded from external libraries
 * @property {SharedStyle[]} textStyles - Array with all text styles of the document
 * @property {SharedStyle[]} foreignTextStyles - Array with all text styles used and loaded from external libraries
 * @property {Node[]} colors - Array with the document color palette
 * @property {Node[]} colorAssets - Array with the document color palette with names
 * @property {Node[]} gradients - Array with the document gradients palette
 * @property {Node[]} gradientAssets - Array with the document gradients palette with names
 */
class Sketch {
    constructor(repo, document, meta, user, pages) {
        this._class = 'sketch';
        this.repo = repo;
        this.document = lib.create(this, document);
        this.meta = lib.create(this, meta);
        this.user = lib.create(this, user);
        this.pages = pages.map(page => lib.create(this, page));
    }

    get symbolsPage() {
        return this.pages.find(page => page.name === 'Symbols');
    }

    get symbols() {
        return this.pages
            .map(page => page.getAll('symbolMaster'))
            .reduce((symbols, currentPage) => symbols.concat(currentPage));
    }

    get foreignSymbols() {
        return this.document.foreignSymbols.map(symbol => symbol.symbolMaster);
    }

    get layerStyles() {
        return this.document.layerStyles.objects;
    }

    get foreignLayerStyles() {
        return this.document.foreignLayerStyles.map(style => style.localSharedStyle);
    }

    get textStyles() {
        return this.document.layerTextStyles.objects;
    }

    get foreignTextStyles() {
        return this.document.foreignTextStyles.map(style => style.localSharedStyle);
    }

    get colors() {
        return this.document.assets.colors;
    }

    get colorAssets() {
        return this.document.assets.colorAssets;
    }

    get gradients() {
        return this.document.assets.gradients;
    }

    get gradientAssets() {
        return this.document.assets.gradientAssets;
    }

    /**
     * Exports the file previews to other location
     *
     * @param  {string} dir - The directory path of the exported file.
     *
     * @example
     * //Export all document previews to a directory
     * sketch.exportPreviews('/path/to/export');
     */
    exportPreviews(dir) {
        const previews = this.repo.folder('previews');
        return exportFolder(previews, dir);
    }

    /**
     * Exports the file previews to other location
     *
     * @param  {string} dir - The directory path of the exported file.
     *
     * @example
     * //Export all text previews to a directory
     * sketch.exportTextPreviews('/path/to/export');
     */
    exportTextPreviews(dir) {
        const previews = this.repo.folder('text-previews');
        return exportFolder(previews, dir);
    }

    /**
     * Save the document as a sketch file
     * @example
     * ns.read('input.sketch').then((sketch) => {
     *
     *  //modify the sketch data
     *
     *  sketch.save('output.sketch')
     * })
     * @param  {string} file - The file path
     * @return {Promise}
     */
    save(file) {
        this._saveJson();

        return new Promise((resolve, reject) => {
            this.repo
                .generateNodeStream({
                    type: 'nodebuffer',
                    streamFiles: true,
                    compression: 'DEFLATE'
                })
                .pipe(fs.createWriteStream(file))
                .on('finish', () => {
                    resolve(file);
                })
                .on('error', err => {
                    reject(err);
                });
        });
    }

    /**
     * Save the document into a directory with pretty json
     * Useful to inspect the json scheme of a sketch file
     *
     * @param  {string} dir [description]
     * @return {Promise}
     */
    saveDir(dir) {
        this._saveJson(true);
        return exportFolder(this.repo, dir);
    }

    /**
     * @private
     */
    _saveJson(pretty) {
        const space = pretty ? 2 : 0;

        this.document.pages = this.pages.map(page => {
            this.repo.file(`pages/${page.do_objectID}.json`, JSON.stringify(page, null, space));

            return {
                _class: 'MSJSONFileReference',
                _ref_class: 'MSImmutablePage',
                _ref: `pages/${page.do_objectID}`
            };
        });

        this.repo.file('document.json', JSON.stringify(this.document, null, space));
        this.repo.file('meta.json', JSON.stringify(this.meta, null, space));
        this.repo.file('user.json', JSON.stringify(this.user, null, space));
    }
}

module.exports = Sketch;

function exportFolder(repo, dir) {
    const promises = [];

    repo.forEach((name, file) => {
        promises.push(
            new Promise((fulfill, reject) => {
                if (file.dir) {
                    return fulfill();
                }

                const dest = path.join(dir, name);
                const destDir = path.dirname(dest);

                if (!fs.existsSync(destDir)) {
                    fs.mkdirSync(destDir);
                }

                file.nodeStream()
                    .pipe(fs.createWriteStream(dest))
                    .on('finish', () => {
                        fulfill(dest);
                    })
                    .on('error', err => {
                        reject(err);
                    });
            })
        );
    });

    return Promise.all(promises);
}
