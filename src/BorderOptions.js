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
