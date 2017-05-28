const Node  = require('./Node');
const Color = require('./Color');

module.exports = class Border extends Node {
    constructor(data) {
        super(data);
        this.color = new Color(this.color);
    }
}
