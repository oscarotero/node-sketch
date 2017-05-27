const Shape = require('./Shape');

module.exports = class Star extends Shape {
    constructor(parent, data) {
        super(parent, data, {
            _class: 'star',
            numberOfPoints: 5,
            radius: 0.5
        });
    }
}
