const Shape = require('./Shape');

module.exports = class Polygon extends Shape {
    constructor(parent, data) {
        super(parent, data, {
            _class: 'polygon',
            numberOfPoints: 5
        });
    }
}
