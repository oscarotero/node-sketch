const Node                   = require('./Node');
const Color                  = require('./Color');
const GraphicContextSettings = require('./GraphicContextSettings');

module.exports = class Shadow extends Node {
    constructor(data) {
        super(data);

        this.color = new Color(this.color);
        this.contextSettings = new GraphicContextSettings(this.contextSettings);
    }
}
