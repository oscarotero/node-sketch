module.exports = class ExportOptions {
    constructor(data) {
        Object.assign(this,
            {
                _class: 'exportOptions',
                exportFormats: [],
                includedLayerIds: [],
                layerOptions: 0,
                shouldTrim: false
            },
            data
        );
    }
}
