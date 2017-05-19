# sketch (WIP)
Javascript library to manipulate sketch files

## Example:

```js
const sketch = require('node-sketch');

async function run() {
    const file = await sketch.read('design.sketch');
    
    //Iterate with the pages
    file.pages.forEach((page) => {
        console.log(page.name);
    });

    //Iterate with the artboards
    const firstPage = file.pages[0];

    firstPage.forEach((artboard) => {
        console.log(artboard.name);
    });

    //Search for a specific layer class
    const artboard = firstPage.find((layout) => layout.type === 'artboard');

    artboard.width = 500;
    artboard.height = 500;
    artboard.x = 50;
    artboard.y = 50;

    //Save the result
    file.save('modified-design.sketch');
}

run().catch((err) => {
    console.error(err);
});
```
