const Node = require('./Node');
const path = require('path');
const fs = require('fs');

/**
 * Represents a file, for example an image
 *
 * @extends {Node}
 *
 * @property {string|undefined} file - The path to the saved file in the sketch
 */
class FileReference extends Node {
    get file() {
        if (this._ref_class === 'MSImageData') {
            return this._ref;
        }
    }

    /**
     * Exports the file to other location
     *
     * @param  {string} dir - The directory path of the exported file.
     * @param  {string} [name] - New name for the exported file.
     *
     * @example
     * //Export all images to a directory
     * sketch.pages.forEach(page => {
     *     page.getAll('MSJSONFileReference').forEach(ref => {
     *         ref.export('/path/to/export');
     *     })
     * })
     */
    export(dir, name) {
        return new Promise((fulfill, reject) => {
            const sketch = this.getParent('sketch');
            const file = sketch.repo
                .filter(f => {
                    return f.startsWith(this.file);
                })
                .pop();

            if (file) {
                const dest = path.join(dir, name ? `${name}${path.extname(file.name)}` : file.name);

                file.nodeStream()
                    .pipe(fs.createWriteStream(dest))
                    .on('finish', () => {
                        fulfill(dest);
                    })
                    .on('error', err => {
                        reject(err);
                    });
            } else {
                reject('No file found');
            }
        });
    }
}

module.exports = FileReference;
