const nodeSketch = require('../');

const RemoveDuplicatedSymbols = require('../plugins/RemoveDuplicatedSymbols');
const RemoveDuplicatedStyles = require('../plugins/RemoveDuplicatedStyles');
const UpdateStyles = require('../plugins/updateStyles');
const UpdateSymbols = require('../plugins/updateSymbols');

nodeSketch
    .read([__dirname + '/example.sketch', __dirname + '/resources.sketch'])
    .then(files => {
        let [sketch, resources] = files;

        sketch.use(new RemoveDuplicatedSymbols())
            .use(new RemoveDuplicatedStyles())
            .use(new UpdateStyles(resources))
            .use(new UpdateSymbols(resources))
            .save(__dirname + '/result.sketch');
    })
    .catch(err => {
        console.error('Error reading the sketch file');
        console.error(err);
    });
