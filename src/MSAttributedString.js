module.exports = class MSAttributedString {
    constructor(data) {
        Object.assign(this,
            {
                _class: 'MSAttributedString',
                archivedAttributedString: null
            },
            data
        );
    }
}
