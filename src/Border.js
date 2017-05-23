const Color = require('./Color');
const BorderPositions = [0, 1, 2, 3];
const FillTypes = [0, 1, 4, 5];

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
