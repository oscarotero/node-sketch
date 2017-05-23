const BorderLineCapStyles = [0, 1, 2];
const BorderLineJoinStyles = [0, 1, 2];

module.exports = class BorderOptions {
    constructor(data) {
        Object.assign(this,
            {
                _class: 'borderOptions',
                isEnabled: true,
                dashPattern: [],
                lineCapStyle: 0,
                lineJoinStyle: 0,
            },
            data
        );
    }
}
