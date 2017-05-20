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

    //Get the 'Symbols' page
    const symbolsPage = sketch.getSymbolsPage();

    //Search for the symbol 'button'
    const buttonSymbol = symbolsPage.searchSymbol((symbol) => symbol.name === 'button');

    //Search all instances of a symbol called 'old-button' and replace it with 'button'
    sketch
        .searchAll((layout) => {
            return layout.type === 'symbolInstance' && layout.symbol.name === 'old-button';
        })
        .forEach((symbolInstance) {
            symbolInstance.symbol = buttonSymbol;
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

Name | Type | Description
-----|------|-------------
`repo` | `JSZip` | A instance of JSZip with the sketch file
`document` | `Object` | The document data
`meta` | `Object` | The meta data
`user` | `Object` | The user data
`pages` | `Array` | The pages in the document

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

Returns a Map instance with all master symbols of all pages the document. The key of the values is the symbol ID. Example:

```js
const symbols = sketch.getSymbols();
```

#### getSymbolsPage()

Returns the 'Symbols' page if exists. Example:

```js
const symbolsPage = sketch.getSymbolsPage();
```

#### save(path)

Saves the sketch file

```js
sketch.save('awesome-design.sketch');
```

### Layout

All elements in a sketch file are "layouts". They can be pages, artboards, groups, symbols, etc. The `Layout` class (and all subclasses) extends `Array`, so all methods like `filter`, `forEach`, `map`, etc, can be used to iterate with the layout children. For example:

```js
//Get the first page
const page = sketch.pages[0];

//Iterate with the page children (usually artboards and symbols)
page.forEach((child) => {
    console.log(child.name);
});
```

All `Layout` instances have the following properties:

Name | Type | Editable | Description
-----|------|----------|------------
`id` | `string` | No | The element unique id
`name` | `string` | Yes | The name
`type` | `string` | No | The element type (for exampe: page, artboard, symbolInstance, symbolMaster, etc)
`parent` | `Layout|undefined` | No | The parent of the element
`width` | `int` | Yes | The width of the element
`height` | `int` | Yes | The height of the element
`x` | `int` | Yes | The x position of the element
`y` | `int` | Yes | The y position of the element

It contains also the following method are added:

####  detach()

Detach the element from its parent.

```js
const firstPage = sketch.pages[0];
const firstArtboard = firstPage[0].detach();
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

#### searchParent(condition)

Returns the first parent element matching with the condition. Example:

```js
const page = layer.searchParent((parent) => parent.type === 'page');
```

#### toJson()

Returns the json data with all info.

```js
const json = firstArboard.toJson();
```

### Page

`Page` is a subclass of `Layout`, so it inherit all its properties and methods, but including also the following additions:

#### getSymbols()

Returns a Map instance with all master symbols defined in the page. The key of the values is the symbol ID. Example:

```js
const page = sketch.pages[0];
const symbols = page.getSymbols();
```

#### searchSymbol(condition)

Search for a specific symbol defined in the page. Example:

```js
const page = sketch.pages[0];
const buttonSymbol = page.searchSymbol((symbol) => symbol.name === 'button');
```

### SymbolMaster

`SymbolMaster` is a subclass of `Layout`. In addition to all properties and methods, includes also the following properties:

Name | Type | Editable | Description
-----|------|----------|------------
`symbolId` | `string` | No | The unique id to identify the symbol

### SymbolInstance

`SymbolInstance` is a subclass of `Layout`. In addition to all properties and methods, includes also the following properties:

Name | Type | Editable | Description
-----|------|----------|------------
`symbolId` | `string` | Yes | The unique id to identify the symbol master
`symbol` | `SymbolMaster` | Yes | The reference to the symbol master
