const Node = require('./Node');
const path = require('path');
const fs = require('fs');

/**
 * Represents a file, for example an image
 *
 * @extends {Node}
 * 
 * @property {string|undefined} file - The path to the saved file in the sketch
 * 
 * @example
 * //Get a layer named 'block'
 * const block = sketch.pages[0].get('shapeGroup', 'block');
 *
 * //Get the shared style
 * const sharedStyle = block.style.sharedStyle;
 *
 * //Get a shared style named 'red'
 * const redStyle = sketch.sharedStyles.find(style => style.name === 'red');
 *
 * //Assign a different shared style
 * block.style.sharedStyle = redStyle;
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
     */
    export(dir) {
        return new Promise((fulfill, reject) => {
            const sketch = this.getParent('sketch');
            const file = sketch.repo.filter(f => {
                    return f.startsWith(this.file);
                }).pop();

            if (file) {
                const dest = path.join(dir, path.basename(file.name));

                file.nodeStream()
                    .pipe(fs.createWriteStream(dest))
                    .on('finish', () => { fulfill(dest) })
                    .on('error', (err) => { reject(err) });
            } else {
                reject('No file found');
            }
        });
    }
}

module.exports = FileReference;
