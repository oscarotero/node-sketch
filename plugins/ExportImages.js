const path = require('path');
/**
 * Plugin to export the images of a sketch file into a directory
 *
 * @alias module:plugins.ExportImages
 * @example
 * sketch.use(new ExportImages('path/to/dest'));
 */
class ExportImages {
    /**
     * @constructor
     *
     * @param {string} dest Directory where the images are saved
     */
    constructor(dest) {
        this.dest = dest;
    }

    run(sketch) {
        const images = [];

        sketch.pages.forEach(page => {
            page.getAll('MSJSONFileReference').forEach(ref => {
                images.push(ref);
            });
        });

        return Promise.all(images.map(img => {
            return img.export(this.dest);
        }));
    }
}

module.exports = ExportImages;
