const Shape = require('./Shape');

module.exports = class Star extends Shape {
    constructor(data) {
        super(data, {
            _class: 'star',
            numberOfPoints: 5,
            radius: 0.5
        });
    }
}
