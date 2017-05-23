module.exports = class Color {
    constructor(data) {
        Object.assign(this,
            {
                _class: 'color',
                red: 0,
                green: 0,
                blue: 0,
                alpha: 1,
            },
            data
        );
    }
}
