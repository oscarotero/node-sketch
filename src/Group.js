const Layer = require('./Layer');

module.exports = class Group extends Layer {
    constructor(parent, data) {
        super(parent, data, {
            _class: 'group'
        });
    }
}
