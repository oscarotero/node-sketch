const Shape = require('./Shape');

module.exports = class Rectangle extends Shape {
    constructor(parent, data) {
        super(parent, data, {
            _class: 'rectangle',
            fixedRadius: 0,
            hasConvertedToNewRoundCorners: true
        });
    }
}
