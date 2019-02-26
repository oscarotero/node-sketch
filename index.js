const fs = require('fs');
const JSZip = require('jszip');
const Sketch = require('./src/Sketch');

(function(lib) {
    /**
     * Load the source content of a sketch file and return a promise with
     * a Sketch instance
     * @alias load
     * @param {String} source - Content of a sketch file
     *
     * @return {Promise}
     */
    lib.load = function(source) {
        return JSZip.loadAsync(source)
            .then(zip => {
                return Promise.all([
                    zip.file('document.json').async('string'),
                    zip.file('meta.json').async('string'),
                    zip.file('user.json').async('string')
                ]).then(result => {
                    return {
                        repo: zip,
                        document: JSON.parse(result[0]),
                        meta: JSON.parse(result[1]),
                        user: JSON.parse(result[2])
                    };
                });
            })
            .then(data => {
                return Promise.all(
                    data.document.pages.map(page => {
                        return data.repo.file(`${page._ref}.json`).async('string');
                    })
                ).then(pages => {
                    data.pages = pages.map(page => JSON.parse(page));
                    return data;
                });
            })
            .then(data => {
                return new Sketch(data.repo, data.document, data.meta, data.user, data.pages);
            });
    };

    /**
     * Read a sketch file and returns a promise with a Sketch instance
     * @alias read
     * @param  {Array|String} file - Can be a path or an array of paths
     *
     * @example
     * //Load a file
     * nodeSketch.read('design.sketch').then(sketch => {
     *   console.log(sketch);
     * }).catch(err => {
     *   console.error('Error reading the file');
     * });
     *
     * //Load an array of files
     * nodeSketch.read(['design.sketch', 'other-design.sketch']).then(files => {
     *   let [design, other] = files;
     *
     *   console.log(design);
     *   console.log(other);
     * }).catch(err => {
     *   console.error('Error reading some files');
     * })
     *
     * @return {Promise}
     */
    lib.read = function(file) {
        if (Array.isArray(file)) {
            return Promise.all(file.map(each => lib.read(each)));
        }

        return lib.load(fs.readFileSync(file));
    };

    const Node = require('./src/Node');
    const classes = {
        style: require('./src/Style'),
        symbolInstance: require('./src/SymbolInstance'),
        MSJSONFileReference: require('./src/FileReference')
    };

    /**
     * Creates a new Node elements
     *
     * @ignore
     * @param  {Node|Sketch} parent - The node parent
     * @param  {Object} - The json with the raw data
     *
     * @return {Node}
     */
    lib.create = function(parent, data) {
        if (data._class in classes) {
            return new classes[data._class](parent, data);
        }

        return new Node(parent, data);
    };
})(require('./index'));
