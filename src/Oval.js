const Shape = require('./Shape');

module.exports = class Oval extends Shape {
    constructor(parent, data) {
        super(parent, data, {
            _class: 'oval'
        });
    }
}
