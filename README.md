# sketch (WIP)
Javascript library to manipulate sketch files

## Example:

```js
const Sketch = require('sketch').Sketch;

async function run() {
    const file = await Sketch.read('design.sketch');
    
    //Iterate with the pages
    file.pages.forEach((page) => {
        console.log(page.name);
    });

    //Iterate with the artboards
    const firstPage = file.pages[0];

    firstPage.artboards.forEach((artboard) => {
        console.log(artboard.name);
    });

    //Search for a specific layer class
    const artboard = firstPage.getChild('artboard');

    artboard.width = 500;
    artboard.height = 500;
    artboard.x = 50;
    artboard.y = 50;

    //Save the result
    file.save('modified-design.sketch');
}
```
