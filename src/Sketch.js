const fs = require('fs');
const lib = require('../index');
const utils = require('./utils');

class Sketch {
    constructor(repo, document, meta, user, pages) {
        this.repo = repo;
        this.document = document;
        this.meta = meta;
        this.user = user;
        this.pages = pages.map((page) => lib.create(this, page));
    }

    search(condition) {
        for (let page of this.pages) {
            let layer = page.search(condition);

            if (layer) {
                return layer;
            }
        }
    }

    searchAll(condition, result) {
        result = result || [];

        for (let page of this.pages) {
            page.searchAll(condition).forEach((layer) => result.push(layer));
        }

        return result;
    }

    getSymbols() {
        const result = new Map();

        this.pages.forEach((page) => utils.mapSymbols(page.getSymbols(), result));

        return result;
    }

    getSymbolsPage() {
        return this.pages.find((page) => page.name === 'Symbols');
    }

    //Save document as sketch file
    save(file) {
        const pagesFolder = this.repo.folder('pages');

        this.document.pages = this.pages.map((page) => {
            this.repo.file(`pages/${page.id}.json`, page.toString());

            return {
                _class: 'MSJSONFileReference',
                _ref_class: 'MSImmutablePage',
                _ref: `pages/${page.id}`
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
