const Layer = require('./Layer');

module.exports = class ShapeGroup extends Layer {
    constructor(parent, data) {
        super(parent, data, {
            _class: 'shapeGroup',
            resizingConstraint: 63,
            rotation: 0,
            hasClickThrough: false,
            clippingMaskMode: 0,
            hasClippingMask: false,
            windingRule: 1
        });
    }
}
