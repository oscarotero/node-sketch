const Color = require('./Color');

module.exports = class GradientStop {
    constructor(data) {
        Object.assign(this,
            {
                _class: 'gradientStop',
                position: 0
            },
            data
        );

        this.color = new Color(this.color);
    }
}
