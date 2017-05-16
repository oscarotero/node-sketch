const Page = require('./Page');

class Sketch {
    constructor(files) {
        this.files = files;
        this.pages = null;
    }

    getPages() {
        if (!this.pages) {
            this.pages = this.files
                .filter((file) => {
                    return file.name.startsWith('pages/')
                })
                .map((file) => {
                    return new Page(file);
                });
        }

        return this.pages;
    }
}

module.exports = Sketch;