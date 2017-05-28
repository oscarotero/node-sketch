const Node  = require('./Node');
const Color = require('./Color');

module.exports = class GradientStop extends Node {
    constructor(data) {
        super(data);
        this.color = new Color(this.color);
    }
}
