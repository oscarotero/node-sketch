const ExportOptions = require('./ExportOptions');
const Rect = require('./Rect');
const Path = require('./Path');

module.exports = class Shape {
    constructor(data, extraData) {
        Object.assign(this,
            {
                _class: null,
                do_objectID: null,
                isFlippedHorizontal: false,
                isFlippedVertical: false,
                isLocked: false,
                isVisible: true,
                layerListExpandedType: 0,
                name: 'Path',
                nameIsFixed: false,
                resizingConstraint: 63,
                resizingType: 0,
                rotation: 0,
                shouldBreakMaskChain: false,
                booleanOperation: -1,
                edited: false
            },
            extraData,
            data
        );

        this.exportOptions = new ExportOptions(this.exportOptions);
        this.frame = new Rect(this.frame);
        this.path = new Path(this.path);
    }
}
