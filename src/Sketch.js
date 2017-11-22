const fs = require('fs');
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
 * @property {Node[]} localSymbols - Array with all local symbols (symbols stored in any page of the document)
 * @property {Node[]} foreignSymbols - Array with all foreign symbols used in the document (symbols loaded from libraries)
 * @property {SharedStyle[]} sharedStyles - Array with all shared styles of the document
 * @property {SharedStyle[]} textStyles - Array with all text styles of the document
 * @property {Node[]} colors - Array with the document color palette
 * @property {Node[]} gradients - Array with the document gradients palette
 */
class Sketch {
    constructor(repo, document, meta, user, pages) {
        this._class = 'sketch';
        this.repo = repo;
        this.document = lib.create(this, document);
        this.meta = lib.create(this, meta);
        this.user = lib.create(this, user);
        this.pages = pages.map(page => lib.create(this, page));
        this.queue = Promise.resolve();
    }

    get symbolsPage() {
        return this.pages.find(page => page.name === 'Symbols');
    }

    get localSymbols() {
        return this.pages
            .map(page => page.getAll('symbolMaster'))
            .reduce((symbols, currentPage) => symbols.concat(currentPage));
    }

    get foreignSymbols() {
        return this.document.foreignSymbols.map(symbol => symbol.symbolMaster);
    }

    get sharedStyles() {
        return this.document.layerStyles.objects;
    }

    get textStyles() {
        return this.document.layerTextStyles.objects;
    }

    get colors() {
        return this.document.assets.colors;
    }

    get gradients() {
        return this.document.assets.gradients;
    }

    /**
     * Execute a plugin with the sketch
     * @param  {function} plugin The plugin to execute
     * @return {this}
     */
    use(plugin) {
        this.queue.then(() => plugin.run(this));

        return this;
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
     * @return {this}
     */
    save(file) {
        this.queue.then(() => {
            const pagesFolder = this.repo.folder('pages');

            this.document.pages = this.pages.map(page => {
                this.repo.file(
                    `pages/${page.do_objectID}.json`,
                    JSON.stringify(page)
                );

                return {
                    _class: 'MSJSONFileReference',
                    _ref_class: 'MSImmutablePage',
                    _ref: `pages/${page.do_objectID}`
                };
            });

            this.repo.file('document.json', JSON.stringify(this.document));
            this.repo.file('meta.json', JSON.stringify(this.meta));
            this.repo.file('user.json', JSON.stringify(this.user));

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
        });

        return this;
    }
}

module.exports = Sketch;
