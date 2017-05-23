const Shape = require('./Shape');

module.exports = class Triangle extends Shape {
    constructor(data) {
        super(data, {
            _class: 'triangle',
            isEquilateral: false
        });
    }
}
