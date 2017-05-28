const sketch = require('./index');

sketch.read('demo.sketch')
    .then(function (file) {

        //Get the symbol 'circle:black'
        const circleBlack = file
            .getSymbolsPage()
            .getSymbols().find((symbol) => symbol.name === 'circle:black');

        file
            .searchLayers((layer) => {
                return layer.type === 'symbolInstance' && layer.symbol.name === 'circle';
            })
            .forEach((symbolInstance) => {
                symbolInstance.symbol = circleBlack;
            });


    /*
        //Iterate with the pages
        file.pages.forEach((page) => {
            console.log(page.name);
            console.log(page.getSymbols());
        });
        return;

        //Iterate with the artboards
        file.pages[0].forEach((artboard) => {
            console.log(artboard.name);
        });

        //Search for a specific symbol
        const btnSymbol = file.search((layout) => {
            return layout.type === 'symbolMaster' && layout.name === 'circle';
        });

        //Search for all instances of this symbol
        const instances = file.searchAll((layout) => {
            return layout.type === 'symbolInstance' && layout.symbolId === btnSymbol.symbolId;
        });

        console.log(instances);
        */

        //Save the result
        file.save(__dirname + '/demo-copy.sketch');
    })
    .catch((err) => {
        console.error(err);
    });
