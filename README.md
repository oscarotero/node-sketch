# node-sketch (WIP)
Javascript library to manipulate sketch files

## Example:

```js
const ns = require('node-sketch');

async function run() {
    const sketch = await ns.read('design.sketch');
    
    //Iterate with the pages
    sketch.pages.forEach((page) => {
        console.log(page.name);

        //Iterate with the artboards
        page.forEach((artboard) => {
            console.log(artboard.name);
        });
    });

    //Search for a symbol called "button"
    const btnSymbol = sketch.search((layout) => {
        return layout.type === 'symbolMaster' && layout.name === 'button'
    });

    //Search for all instances of this symbol
    const instances = sketch.searchAll((layout) => {
        return layout.type === 'symbolInstance' && layout.symbolId === btnSymbol.symbolId;
    });

    //Save the result
    sketch.save('modified-design.sketch');
}

run().catch((err) => {
    console.error(err);
});
```

## API

### Sketch

The instances of `Sketch` contain all sketch data (pages, artboards, symbols, etc). It's the object returned by `sketch.read`. (Note that the reading is async):

```js
const ns = require('node-sketch');

ns.read('design.sketch').then((sketch) => {
    console.log(sketch instanceof ns.Sketch); //true
});
```

The sketch instance contains the following properties:

* `repo`: The instance of JSZip with the sketch file
* `document`: Object with the document data
* `meta`: Object with the meta data
* `user`: Object with the user data
* `pages`: Array with all pages in the document

It contains also some useful methods:

#### search(condition)

Returns the first element matching with the condition. Example:

```js
const group = sketch.search((layer) => layer.type === 'group');
```

#### searchAll(condition)

Returns an array with all elements matching with the condition. Example:

```js
const groups = sketch.searchAll((layer) => layer.type === 'group');
```

#### getSymbols()

Returns a Map instance with all symbols of the document. The key of the values is the symbol ID. Example:

```js
const symbols = sketch.getSymbols();
```

#### save(path)

Saves the sketch file

```js
sketch.save('awesome-design.sketch');
```

### Layout

All elements in a sketch file is a layout. It can be a page, a artboard, a group, symbol, etc. The `Layout` class (and all subclasses) extends `Array`, so all methods like `filter`, `forEach`, `map`, etc, can be used to iterate with the children. For example:

```js
//Get the first page
const page = sketch.pages[0];

//Iterate with the page children (usually the artboards)
page.forEach((child) => {
    console.log(child.name);
});
```

All `Layout` instances have the following properties:

* `id` (readonly) The element unique id
* `name` The element name
* `type` (readonly) String with the element type (page, artboard, symbolInstance, symbolMaster, etc)
* `parent` (readonly) The element parent
* `width` The element width
* `height` The element height
* `x` The element x position
* `y` The element y position

In addition to the `Array` properties and methods, the following method are added:

####  detach()

Detach the element from its parent.

```js
const firstArtboard = sketch.pages[0][0].detach();
```

#### search(condition)

Returns the first inner element matching with the condition. Example:

```js
const group = firstArboard.search((layer) => layer.type === 'group');
```

#### searchAll(condition)

Returns an array with all inner elements matching with the condition. Example:

```js
const groups = firstArboard.searchAll((layer) => layer.type === 'group');
```

#### toJson()

Returns the json data with all info.

```js
const json = firstArboard.toJson();
```
