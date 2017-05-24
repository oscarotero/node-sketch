module.exports = class GraphicContextSettings {
    constructor(data) {
        Object.assign(this,
            {
                _class: 'graphicContextSettings',
                blendMode: 0,
                opacity: 1
            },
            data
        );
    }
}
