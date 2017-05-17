const Layer    = require('./Layer');
const Artboard = require('./Artboard');

class Page extends Layer {
	constructor(sketch, data) {
        super(sketch, data);
		this.artboards = null;
	}

	getArtboards() {
        return this.getChildren(Artboard.type);
    }
}

Page.type = 'page';

module.exports = Page;
