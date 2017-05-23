const Shape = require('./Shape');

module.exports = class Rectangle extends Shape {
    constructor(data) {
        super(data, {
            _class: 'rectangle',
            fixedRadius: 0,
            hasConvertedToNewRoundCorners: true
        });
    }
}
