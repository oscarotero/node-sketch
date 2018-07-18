const lib = require('../');

/**
 * Plugin to update the document styles with the styles defined in an external document (using the style name)
 *
 * @alias module:plugins.UpdateStyles
 * @example
 * sketch.use(new UpdateStyles('path/to/styles.sketch'));
 */
class UpdateStyles {
    /**
     * @constructor
     *
     * @param {string} resources Filepath of the sketch file with the styles
     */
    constructor(resources) {
        this.resources = resources;
    }

    run (sketch) {
        return lib.read(this.resources)
            .then(resources => {
                this.layerStyles = new Map();

                resources.layerStyles.forEach(style =>
                    this.layerStyles.set(style.name, style)
                );

                sketch.layerStyles.forEach(layerStyle => {
                    if (this.layerStyles.has(layerStyle.name)) {
                        const newLayerStyle = layerStyle.replaceWith(
                            this.layerStyles.get(layerStyle.name).clone()
                        );

                        //Update the referencies
                        sketch.pages.forEach(page => {
                            page
                                .getAll(
                                    'style',
                                    style =>
                                        style.sharedObjectID === layerStyle.do_objectID
                                )
                                .forEach(style => style.applySharedStyle(newLayerStyle));
                        });
                    }
                });
            })
    }
}

module.exports = UpdateStyles;
