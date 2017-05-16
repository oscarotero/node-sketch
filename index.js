const Sketch = require('./src');



async function run () {

	const file = await Sketch('demo.sketch');

	file.getPages().forEach(function (page) {
		console.log(page.getName());
		page.getArtboards().forEach(function (artboard) {
			console.log(artboard.getName());
		})
	});
}

run();
