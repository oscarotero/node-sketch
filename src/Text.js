const ExportOptions = require('./ExportOptions');
const Rect = require('./Rect');
const Path = require('./Path');
const Style = require('./Style');
const MSAttributedString = require('./MSAttributedString');

module.exports = class Text {
    constructor(data) {
        Object.assign(this,
            {
                _class: 'text',
                do_objectID: null,
                isFlippedHorizontal: false,
                isFlippedVertical: false,
                isLocked: false,
                isVisible: true,
                layerListExpandedType: 0,
                name: 'Text',
                nameIsFixed: false,
                resizingConstraint: 47,
                resizingType: 0,
                rotation: 0,
                shouldBreakMaskChain: false,
                automaticallyDrawOnUnderlyingPath: false,
                dontSynchroniseWithSymbol: false,
                glyphBounds: '{}',
                heightIsClipped: false,
                lineSpacingBehaviour: 2,
                textBehaviour: 0
            },
            data
        );

        this.exportOptions = new ExportOptions(this.exportOptions);
        this.frame = new Rect(this.frame);
        this.style = new Style(this.style);
        this.attributedString = new MSAttributedString(this.attributedString);
    }
}
