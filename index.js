const Sketch = require('./src').Sketch;
const fs = require('fs');


async function run () {

	const file = await Sketch.read('demo.sketch');

	//Iterate with the pages
	file.pages.forEach((page) => {
		console.log(page.name);
	});

	//Iterate with the artboards
	file.pages[0].artboards.forEach((artboard) => {
		console.log(artboard.name);
	});

	//Search for a specific layer class
	const artboard = file.pages[0].getChild('artboard');

	artboard.width = 500;
	artboard.height = 500;
	artboard.x = 50;
	artboard.y = 50;

	file.save(__dirname + '/demo-copy.sketch');
}

run();
