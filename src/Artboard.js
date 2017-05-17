const Layer = require('./Layer');

class Artboard extends Layer {
    constructor(sketch, data) {
        super(sketch, data);
    }
}

Artboard.type = 'artboard';

module.exports = Artboard;