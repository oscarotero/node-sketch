const fs = require('fs');
const path = require('path');
const Layer = require('./Layer');
const Artboard = require('./Artboard');
const Page = require('./Page');

class Sketch {
    constructor(file, data) {
        this.file = file;
        this.data = data;
        this.pages = null;
        this.layerCache = {};
    }

    getLayerInstance (data) {
        if (!(data.do_objectID in this.layerCache)) {
            this.layerCache[data.do_objectID] = createInstance(this, data);
        }

        return this.layerCache[data.do_objectID];
    }

    getPages() {
        if (this.pages) {
            return Promise.resolve(this.pages);
        }

        return Promise.all(
            this.data.document.pages.map(async (page) => {
                const contents = await this.file.file(page._ref + '.json').async('string');
                return this.getLayerInstance(JSON.parse(contents));
            })
        ).then((pages) => {
            this.pages = pages;
            return pages;
        });
    }

    removePage(id) {
        if (id instanceof Page) {
            id = id.id;
        }

        const index = this.pages.findIndex((page) => page.id === id);

        if (index !== -1) {
            this.pages.splice(index, 1);
        }
    }

    save(file) {
        if (this.pages) {
            const pages = this.file.folder('pages');

            pages.forEach((filename) => {
                const id = path.basename(filename, '.json');
                const page = this.pages.find((page) => id === page.id);
                
                if (page) {
                    pages.file(filename, page.toString());
                } else {
                    pages.remove(filename);
                }
            });
        }

        return new Promise((resolve, reject) => {
            this.file.generateNodeStream({
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

function createInstance(sketch, data) {
    switch (data._class) {
        case Page.type:
            return new Page(sketch, data);

        case Artboard.type:
            return new Artboard(sketch, data);

        default:
            return new Layer(sketch, data);
    }
}