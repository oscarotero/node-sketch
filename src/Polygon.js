const Shape = require('./Shape');

module.exports = class Polygon extends Shape {
    constructor(data) {
        super(data, {
            _class: 'polygon',
            numberOfPoints: 5
        });
    }
}
