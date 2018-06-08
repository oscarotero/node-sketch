# 💎 node-sketch
Javascript library to manipulate sketch files

## Install

```sh
npm install node-sketch
```

## Example:

```js
const ns = require('node-sketch');

ns.read('design.sketch').then(sketch => {

    //Search the symbol named 'button'
    const buttonSymbol = sketch.symbolsPage.get('symbolMaster', 'button');

    //Search all instances of a symbol named 'old-button' and replace it with 'button'
    sketch
        .getAll('symbolInstance', instance => instance.symbolMaster.name === 'old-button')
        .forEach(instance => instance.symbolMaster = buttonSymbol);

    //Save the result
    sketch.save('modified-design.sketch');
});
```

[View more examples in the /examples folder](https://github.com/oscarotero/node-sketch/tree/master/examples)

## API

Two classes are used to manage sketch files:

### `Sketch`

Represents the sketch file and contains all data (pages, symbols, styles, shapes, etc). Contains the method `.save()` to create a sketch file with the result.

```js
const ns = require('node-sketch');

ns.read('input.sketch').then(sketch => {
    sketch.document         // document data
    sketch.meta             // meta data
    sketch.user             // user data
    sketch.pages            // array with all pages
    sketch.symbolsPage      // the Symbols page
    sketch.sharedStyles     // array with the shared styles
    sketch.textStyles       // array with the text styles
    sketch.colors           // array containing the colors stored in the color palette
    sketch.gradients        // array containing the gradients stored in the gradient palette
    sketch.localSymbols     // array with all symbols stored in the document
    sketch.foreignSymbols   // array with the symbols loaded from external libraries

    sketch.save('output.sketch');
});
```

### `Node`

It's the base class used by all other elements. Any page, symbol, color, etc is an instance of this class.

```js
const symbolsPage = sketch.symbolsPage;

console.log(symbolsPage instanceof Node); //true 

//It include useful methods to search an inner node by class:
const button = symbolsPage.get('symbolMaster');

//by class and name
const button = symbolsPage.get('symbolMaster', 'button');

//by class and callback
const button = symbolsPage.get('symbolMaster', symbol => symbol.name === 'button');

//Just a callback
const button = symbolsPage.get(node => node._class === 'symbolMaster' && node.name === 'button');

//And the same than above but returning all inner nodes instead just the first:
const allSymbols = symbolsPage.getAll('symbolMaster');
```

There are other classes extending `Node` to provide special funcionalities in some nodes, like `Style` or `SymbolInstance`.

### JSON Scheme

Technically, the sketch format consist in a zip with some json files. To manipulate a sketch file with this library, you need to know the scheme of json. You can see here [an example of the data of a page](https://github.com/oscarotero/node-sketch/wiki/page)


### Plugins

The `plugins` namespace contains a set of plugins with common functions. For example:

```js
const sketch = require('node-sketch');

sketch
    .read(__dirname + '/example.sketch')
    .then(file => {
        file
            .use(new sketch.plugins.RemoveDuplicatedSymbols())
            .use(new sketch.plugins.RemoveDuplicatedStyles())
            .use(new sketch.plugins.ExportImages(__dirname))
            .save(__dirname + '/result.sketch');
    })
    .catch(err => {
        console.error('Error reading the sketch file');
        console.error(err);
    });
```

You can see the [list of available plugins here](plugins)

---

[See the API detailed](https://oscarotero.github.io/node-sketch/)

Or build it locally with `npm run docs`
