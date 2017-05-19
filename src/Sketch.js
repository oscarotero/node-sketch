const fs = require('fs');
const lib = require('./index');

class Sketch {
    constructor(repo, document, meta, user, pages) {
        this.repo = repo;
        this.document = document;
        this.meta = meta;
        this.user = user;
        this.pages = pages.map((page) => lib.create(this, page));
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
