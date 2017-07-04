const nodeSketch = require('../');

const RemoveDuplicatedSymbols = require('../plugins/RemoveDuplicatedSymbols');
const RemoveDuplicatedStyles = require('../plugins/RemoveDuplicatedStyles');
const UpdateStyles = require('../plugins/UpdateStyles');
const UpdateSymbols = require('../plugins/UpdateSymbols');
const ExportImages = require('../plugins/ExportImages');

nodeSketch
    .read(__dirname + '/example.sketch')
    .then(sketch => {
        sketch
            .use(new RemoveDuplicatedSymbols())
            .use(new RemoveDuplicatedStyles())
            .use(new UpdateStyles(__dirname + '/resources.sketch'))
            .use(new UpdateSymbols(__dirname + '/resources.sketch'))
            .use(new ExportImages(__dirname))
            .save(__dirname + '/result.sketch');
    })
    .catch(err => {
        console.error('Error reading the sketch file');
        console.error(err);
    });
