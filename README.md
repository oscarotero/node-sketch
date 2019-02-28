# 💎 node-sketch
Javascript library to manipulate sketch files

[![Build Status](https://travis-ci.org/oscarotero/node-sketch.svg?branch=master)](https://travis-ci.org/oscarotero/node-sketch)

## Install

```sh
npm install node-sketch
```

## Example:

```js
const ns = require('node-sketch');

async function run() {
    const sketch = await ns.read(__dirname + '/design.sketch');

    //Search the symbol named 'button'
    const buttonSymbol = sketch.symbolsPage.get('symbolMaster', 'button');

    //Search all instances of a symbol named 'old-button' and replace it with 'button'
    sketch
        .getAll('symbolInstance', instance => instance.symbolMaster.name === 'old-button')
        .forEach(instance => instance.symbolMaster = buttonSymbol);

    //Save the result
    sketch.save('modified-design.sketch')
        .then(console.log('File saved!!'));
}

run();
```

## API

Two classes are used to manage sketch files:

### `Sketch`

Represents the sketch file and contains all data (pages, symbols, styles, shapes, etc). Contains the method `.save()` to create a sketch file with the result.

```js
const ns = require('node-sketch');

ns.read('input.sketch').then(sketch => {
    sketch.document           // document data
    sketch.meta               // meta data
    sketch.user               // user data
    sketch.pages              // array with all pages
    sketch.symbolsPage        // the Symbols page
    sketch.layerStyles        // array with the layer styles
    sketch.textStyles         // array with the text styles
    sketch.colors             // array containing the colors stored in the color palette
    sketch.gradients          // array containing the gradients stored in the gradient palette
    sketch.symbols            // array with all symbols stored in the document

    sketch.foreignSymbols     // array with the symbols loaded from external libraries
    sketch.foreignLayerStyles // array with the layer styles loaded from external libraries
    sketch.foreignTextStyles  // array with the text styles loaded from external libraries

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

Technically, the sketch format consist in a zip with some json files. To manipulate a sketch file with this library, you need to know the scheme of json. You can use this code to read and extract a sketch file into a directory, in order to inspect the json scheme:

```js
const ns = require('../');

ns.read('demo.sketch').then(sketch => sketch.saveDir('demo'));
```
Here you can see [an example of extracted file](demos/scheme-explorer)

### CLI

Starting from v0.14.0, the command `node-sketch` was included to use the library from CLI. You only need a file named `node-sketch.js` exporting the function to manipulate a sketch file. For example:

```js
module.exports = sketch => {
    //Convert the text style names to uppercase
    sketch.textStyles.forEach(textStyle => {
        textStyle.name = textStyle.name.toUpperCase();
    })
}
```
To execute this script with the sketch file `my-styles.sketch`, run `node-sketch my-styles.sketch`.
By default, the file is readed, but not saved. If you want to override the file with the modifications, run `node-sketch my-styles.sketch --save`.

And to execute a script file with a different name, use the `--script` argument: `node-sketch my-styles.sketch --script=my-script.js --save`.

---

[See the API detailed](https://oscarotero.github.io/node-sketch/)

Or build it locally with `npm run docs`
