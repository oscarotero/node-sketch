const LayerContainer = require('./LayerContainer');
const Color          = require('./Color');
const RulerData      = require('./RulerData');
const lib            = require('../');

module.exports = class Artboard extends LayerContainer {
    constructor(parent, data) {
        super(parent, data);

        this.backgroundColor = new Color(this.backgroundColor);
        this.horizontalRulerData = new RulerData(this.horizontalRulerData);
        this.verticalRulerData = new RulerData(this.verticalRulerData);
    }
}
