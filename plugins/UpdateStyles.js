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
                this.sharedStyles = new Map();

                resources.sharedStyles.forEach(style =>
                    this.sharedStyles.set(style.name, style)
                );

                sketch.sharedStyles.forEach(sharedStyle => {
                    if (this.sharedStyles.has(sharedStyle.name)) {
                        const newSharedStyle = sharedStyle.replaceWith(
                            this.sharedStyles.get(sharedStyle.name).clone()
                        );

                        //Update the referencies
                        sketch.pages.forEach(page => {
                            page
                                .getAll(
                                    'style',
                                    style =>
                                        style.sharedObjectID === sharedStyle.do_objectID
                                )
                                .forEach(style => style.applySharedStyle(newSharedStyle));
                        });
                    }
                });
            })
    }
}

module.exports = UpdateStyles;
