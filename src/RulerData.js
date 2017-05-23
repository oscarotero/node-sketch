module.exports = class RulerData {
    constructor(data) {
        Object.assign(this,
            {
                _class: 'rulerData',
                base: 0,
                guides: []
            },
            data
        );
    }
}
