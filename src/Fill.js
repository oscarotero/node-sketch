const Color = require('./Color');
const Gradient = require('./Gradient');
const MSJSONFileReference = require('./MSJSONFileReference');

module.exports = class Fill {
    constructor(data) {
        Object.assign(this,
            {
                _class: 'fill',
                isEnabled: true,
                fillType: 0,
                noiseIndex: 0,
                noiseIntensity: 0,
                patternFillType: 1,
                patternTileScale: 1
            },
            data
        );

        if ('color' in this) {
            this.color = new Color(this.color);
        }

        if ('image' in this) {
            this.image = new MSJSONFileReference(this.image);
        }

        if ('gradient' in this) {
            this.gradient = new Gradient(this.gradient);
        }
    }
}
