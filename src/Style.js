const _sharedstyle = Symbol.for('sharedStyle');
const Node = require('./Node');

/**
 * Represents the style of a layer
 *
 * @extends {Node}
 * @see {@link SharedStyle}
 *
 * @property {SharedStyle|undefined} sharedStyle - The shared style used by this style
 *
 * @example
 * //Get a layer named 'block'
 * const block = sketch.pages[0].get('shapeGroup', 'block');
 *
 * //Get the shared style
 * const sharedStyle = block.style.sharedStyle;
 *
 * //Get a shared style named 'red'
 * const redStyle = sketch.layerStyles.find(style => style.name === 'red');
 *
 * //Assign a different shared style
 * block.style.sharedStyle = redStyle;
 */
class Style extends Node {
    get sharedStyle() {
        if (this[_sharedstyle]) {
            return this[_sharedstyle];
        }

        const sketch = this.getParent('sketch');
        const id = this.getParent().sharedStyleID;

        let sharedStyle = sketch.layerStyles.find(style => style.do_objectID === id);

        if (!sharedStyle) {
            sharedStyle = sketch.textStyles.find(style => style.do_objectID === id);
        }

        if (!sharedStyle) {
            sharedStyle = sketch.foreignLayerStyles.find(style => style.do_objectID === id);
        }

        if (!sharedStyle) {
            sharedStyle = sketch.foreignTextStyles.find(style => style.do_objectID === id);
        }

        this[_sharedstyle] = sharedStyle;
        return sharedStyle;
    }

    set sharedStyle(sharedStyle) {
        this[_sharedstyle] = sharedStyle;

        if (sharedStyle) {
            this.getParent().sharedStyleID = sharedStyle.do_objectID;
        }
    }

    /**
     * Apply a shared style discarding the previous styles
     *
     * @param  {SharedStyle} sharedStyle - The shared style (layout or text) to apply
     *
     * @return {Style} The new style applied
     */
    applySharedStyle(sharedStyle) {
        const parent = this.getParent();

        parent.sharedStyleID = sharedStyle.do_objectID;
        parent.set('style', sharedStyle.value);

        if (parent._class === 'text') {
            const attributes = parent.attributedString.attributes;
            attributes[0].attributes = sharedStyle.value.textStyle.clone().encodedAttributes;
        }
    }
}

module.exports = Style;
