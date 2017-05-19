const sketch = require('./src');

async function run () {
    const file = await sketch.read('demo.sketch');

    //Iterate with the pages
    file.pages.forEach((page) => {
        console.log(page.name);
    });

    //Iterate with the artboards
    file.pages[0].forEach((artboard) => {
        console.log(artboard.name);
    });

    //Search for a specific layer class
    const artboard = file.pages[0].search((layer) => layer.type === 'artboard');

    artboard.width = 500;
    artboard.height = 500;
    artboard.x = 50;
    artboard.y = 50;

    file.save(__dirname + '/demo-copy.sketch');
}

run().catch((err) => {
    console.error(err);
});
