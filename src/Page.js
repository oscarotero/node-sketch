const Layer = require('./Layer');
const RulerData = require('./RulerData');

module.exports = class Page extends Layer {
    constructor(parent, data) {
        super(parent, data, {
            _class: 'page',
            resizingConstraint: 0,
            rotation: 0,
            layerListExpandedType: 0,
            hasClickThrough: true,
            includeInCloudUpdate: true
        });

        this.horizontalRulerData = new RulerData(this.horizontalRulerData);
        this.verticalRulerData = new RulerData(this.verticalRulerData);
    }
}
