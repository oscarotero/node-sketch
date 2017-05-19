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

    //Search for a specific symbol
    const btnSymbol = file.search((layout) => {
        layout.type === 'symbolMaster' && layout.name === 'button'
    });

    //Search for all instances of this symbol
    const instances = file.searchAll((layout) => {
        return layout.type === 'symbolInstance' && layout.symbolId === btnSymbol.symbolId;
    });

    //Save the result
    file.save(__dirname + '/demo-copy.sketch');
}

run().catch((err) => {
    console.error(err);
});
