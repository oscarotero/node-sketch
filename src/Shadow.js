const Color = require('./Color');
const GraphicContextSettings = require('./GraphicContextSettings');

module.exports = class Shadow {
    constructor(data) {
        Object.assign(this,
            {
                _class: 'shadow',
                isEnabled: true,
                blurRadius: 4,
                offsetX: 0,
                offsetY: 2,
                spread: 0,
            },
            data
        );

        this.color = new Color(this.color);
        this.contextSettings = new GraphicContextSettings(this.contextSettings);
    }
}
