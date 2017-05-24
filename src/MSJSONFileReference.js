module.exports = class MSJSONFileReference {
    constructor(data) {
        Object.assign(this,
            {
                _class: 'MSJSONFileReference',
                _ref_class: 'MSImageData',
                _ref: null
            },
            data
        );
    }
}
