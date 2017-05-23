const Shape = require('./Shape');

module.exports = class Oval extends Shape {
    constructor(data) {
        super(data, {
            _class: 'oval'
        });
    }
}
