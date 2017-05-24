const Color = require('./Color');

module.exports = class Border {
    constructor(data) {
        Object.assign(this,
            {
                _class: 'border',
                isEnabled: true,
                fillType: 0,
                position: 1,
                thickness: 1,
            },
            data
        );

        this.color = new Color(this.color);
    }
}
