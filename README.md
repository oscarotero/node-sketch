# node-sketch (WIP)
Javascript library to manipulate sketch files

## Example:

```js
const sketch = require('node-sketch');

async function run() {
    const file = await sketch.read('design.sketch');
    
    //Iterate with the pages
    file.pages.forEach((page) => {
        console.log(page.name);

        //Iterate with the artboards
        page.forEach((artboard) => {
            console.log(artboard.name);
        });
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
    file.save('modified-design.sketch');
}

run().catch((err) => {
    console.error(err);
});
```
