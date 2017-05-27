const Shape = require('./Shape');

module.exports = class Triangle extends Shape {
    constructor(parent, data) {
        super(parent, data, {
            _class: 'triangle',
            isEquilateral: false
        });
    }
}
