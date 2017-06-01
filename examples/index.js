const nodeSketch = require('../');
const removeDuplicatedSymbols = require('./remove-duplicated-symbols');
const removeDuplicatedStyles = require('./remove-duplicated-styles');
const updateResources = require('./update-resources');

nodeSketch
    .read([__dirname + '/example.sketch', __dirname + '/resources.sketch'])
    .then(files => {
        let [sketch, resources] = files;

        removeDuplicatedSymbols(sketch);
        removeDuplicatedStyles(sketch);
        updateResources(sketch, resources);

        return sketch.save(__dirname + '/result.sketch');
    })
    .catch(err => {
        console.error('Error reading the sketch file');
        console.error(err);
    });
