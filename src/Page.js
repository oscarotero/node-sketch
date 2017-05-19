const Layer = require('./Layer');

class Page extends Layer {
	constructor(parent, data) {
		super(parent, data);
	}
}

Page.type = 'page';

module.exports = Page;
