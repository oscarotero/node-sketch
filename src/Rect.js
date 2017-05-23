module.exports = class Rect {
    constructor(data) {
        Object.assign(this,
            {
                _class: 'rect',
                constrainProportions: false,
                x: 0,
                y: 0,
                width: 0,
                height: 0
            },
            data
        );
    }
}
