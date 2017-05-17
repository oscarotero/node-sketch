const Sketch = require('./src');
const fs = require('fs');



async function run () {

	const file = await Sketch('demo.sketch');
	const pages = await file.getPages();
	const page = pages[0];

	file.removePage(page);

	console.log(page.name);
	const artboard = page.getArtboards()[0];

	artboard.getAll('shapeGroup').forEach((layer) => {
		//console.log(layer.data.style);
	});

	fs.writeFileSync(__dirname + '/demo-page.json', page.toString());
	
	file.save(__dirname + '/demo-copy.sketch');
}

run();
