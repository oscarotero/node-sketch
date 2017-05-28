const fs = require('fs');
const Page = require('./Page');

class Sketch {
    constructor(repo, document, meta, user, pages) {
        this.repo = repo;
        this.document = document;
        this.meta = meta;
        this.user = user;
        this.pages = pages.map((page) => new Page(this, page));
    }

    searchLayer(condition) {
        for (let page of this.pages) {
            let layer = page.search(condition);

            if (layer) {
                return layer;
            }
        }
    }

    searchLayers(condition, result) {
        result = result || [];

        for (let page of this.pages) {
            page.searchLayers(condition).forEach((layer) => result.push(layer));
        }

        return result;
    }

    getSymbolsPage() {
        return this.pages.find((page) => page.name === 'Symbols');
    }

    //Save document as sketch file
    save(file) {
        const pagesFolder = this.repo.folder('pages');

        this.document.pages = this.pages.map((page) => {
            this.repo.file(`pages/${page.do_objectID}.json`, JSON.stringify(page));

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
            this.repo.generateNodeStream({
                type: 'nodebuffer',
                streamFiles: true
            })
            .pipe(fs.createWriteStream(file))
            .on('finish', () => {
                resolve(file);
            })
            .on('error', (err) => {
                reject(err);
            });
        });
    }
}

module.exports = Sketch;
