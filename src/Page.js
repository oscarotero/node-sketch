const Artboard = require('./artboard');

class Page {
	constructor(file) {
		this.file = file;
		this.data = JSON.parse(file.contents);
		this.artboards = null;
	}

	getName() {
		return this.data.name;
	}

	getArtboards() {
        if (!this.artboards) {
            this.artboards = this.data.layers
                .filter((layer) => {
                    return layer._class === 'artboard';
                })
                .map((layer) => {
                    return new Artboard(layer);
                });
        }

        return this.artboards;
    }
}

module.exports = Page;
