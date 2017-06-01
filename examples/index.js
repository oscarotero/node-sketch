const nodeSketch = require('../');
const removeDuplicatedSymbols = require('./remove-duplicated-symbols');
const removeDuplicatedStyles = require('./remove-duplicated-styles');
const updateResources = require('./update-resources');

nodeSketch.read(__dirname + '/example.sketch').then(sketch => {

	removeDuplicatedSymbols(sketch);
	removeDuplicatedStyles(sketch);

	return nodeSketch.read(__dirname + '/resources.sketch').then(resources => {
		updateResources(sketch, resources);
	}).then(() => {
		return sketch.save(__dirname + '/result.sketch');
	});

}).catch((err) => {
	console.error('Error reading the sketch file');
	console.error(err);
});