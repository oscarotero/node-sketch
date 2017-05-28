const Node                = require('./Node');
const Color               = require('./Color');
const Gradient            = require('./Gradient');
const MSJSONFileReference = require('./MSJSONFileReference');

module.exports = class Color extends Node {
    constructor(data) {
        super(data);

        if ('color' in this) {
            this.color = new Color(this.color);
        }

        if ('image' in this) {
            this.image = new MSJSONFileReference(this.image);
        }

        if ('gradient' in this) {
            this.gradient = new Gradient(this.gradient);
        }
    }
}
