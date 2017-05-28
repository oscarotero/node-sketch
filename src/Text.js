const Layer              = require('./Layer');
const Style              = require('./Style');
const MSAttributedString = require('./MSAttributedString');

module.exports = class Text extends Layer {
    constructor(parent, data) {
        super(parent, data);

        this.style = new Style(this.style);
        this.attributedString = new MSAttributedString(this.attributedString);
    }
}
