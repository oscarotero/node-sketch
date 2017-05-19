const Layer = require('./Layer');

class Artboard extends Layer {
    constructor(parent, data) {
        super(parent, data);
    }
}

Artboard.type = 'artboard';

module.exports = Artboard;