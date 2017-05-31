const nodeSketch = require('../');
const removeDuplicatedSymbols = require('./remove-duplicated-symbols');

nodeSketch.read(__dirname + '/example.sketch').then(sketch => {

	removeDuplicatedSymbols(sketch);

	sketch.save(__dirname + '/result.sketch');

}).catch((err) => {
	console.error('Error reading the sketch file');
	console.error(err);
});