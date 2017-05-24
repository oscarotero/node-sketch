module.exports = class TextStyle {
    constructor(data) {
        Object.assign(this,
            {
                _class: 'textStyle',
            	encodedAttributes: {}
            },
            data
        );
    }
}
