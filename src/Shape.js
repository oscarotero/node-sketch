const Layer = require('./Layer');
const Path  = require('./Path');

module.exports = class Shape extends Layer {
    constructor(parent, data) {
        super(parent, data);

        this.path = new Path(this.path);
    }
}
