# node-sketch (WIP)
Javascript library to manipulate sketch files

## Example:

```js
const ns = require('node-sketch');

ns.read('design.sketch').then((sketch) => {

    //Get the 'Symbols' page
    const symbolsPage = sketch.getSymbolsPage();

    //Search the symbol named 'button'
    const buttonSymbol = symbolsPage.getAllSymbols().find((symbol) => symbol.name === 'button');

    //Search all instances of a symbol named 'old-button' and replace it with 'button'
    sketch
        .searchLayers((layer) => {
            return layer.type === 'symbolInstance' && layer.symbol.name === 'old-button';
        })
        .forEach((symbolInstance) {
            symbolInstance.symbol = buttonSymbol;
        });

    //Save the result
    sketch.save('modified-design.sketch');
});
```

# API

## Sketch

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

#### searchLayer(condition)

Returns the first layer (artboard, group, shape, etc) matching with the condition. Example:

```js
const group = sketch.search((layer) => layer.type === 'group');
```

#### searchLayers(condition)

Returns an array with all elements matching with the condition. Example:

```js
const groups = sketch.searchLayers((layer) => layer.type === 'group');
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

## Scheme

This library converts the sketch json data to a javascript tree of classes.

```
                            has layers   has parent
Node (base class)
  - Border                      -            -
  - BorderOptions               -            -
  - Color                       -            -
  - CurvePoint                  -            -
  - ExportOptions               -            -
  - Fill                        -            -
  - Gradient                    -            -
  - GradientStop                -            -
  - GraphicContextSettings      -            -
  - MSAttributedString          -            -
  - MSJSONFileReference         -            -
  - Path                        -            -
  - Rect                        -            -
  - RulerData                   -            -
  - Shadow                      -            -
  - Style                       -            -
  - TextStyle                   -            -

    Layer
      - SymbolInstance          -           YES
      - Text                    -           YES

        Shape
          - Oval                -           YES
          - Polygon             -           YES
          - Rectangle           -           YES
          - Star                -           YES
          - Triangle            -           YES

        LayerContainer
          - Artboard           YES          YES
          - Group              YES          YES
          - Page               YES          YES
          - ShapeGroup         YES          YES
          - SymbolMaster       YES          YES
```


## Layer

Many elements in a sketch file are "layers". They can be pages, texts, groups, symbols, etc, and have other parent layers (with the exception of pages that have the sketch instance as parent).

All `Layer` instances have at least the following properties:

Name | Type | Editable | Description
-----|------|----------|------------
`id` | `string` | No | An unique id
`type` | `string` | No | The element type (for exampe: page, artboard, symbolInstance, symbolMaster, etc)
`parent` | `Layer` | No | The parent of the element

It contains also the following methods:

####  detach()

Detach the element from its parent.

```js
const firstPage = sketch.pages[0];
const firstArtboard = firstPage[0].detach();
```

#### searchParent(condition)

Returns the first parent layer matching with the condition. Example:

```js
const page = layer.searchParent((parent) => parent.type === 'page');
```

## LayerContainer

Some layers can contains other layers inside, like in a tree. For example the layers of type artboard, contains groups, shapes, texts, etc.

```js
//Get the first page
const page = sketch.pages[0];

//Iterate with the page layers (usually artboards and symbols)
page.layers.forEach((child) => {
    console.log(child.name);

    //Iterate also with the sublayers
    child.layers.forEach((subchild) => {
        console.log(subchild.name + ' is inside ' + child.name);
    });
});
```

`LayerContainers` inherit the methods and properties of `Layer` but adding the following methods:

#### searchLayer(condition)

Returns the first inner layer matching with the condition. Example:

```js
const group = firstArboard.searchLayer((layer) => layer.type === 'group');
```

#### searchLayers(condition)

Returns an array with all inner layers matching with the condition. Example:

```js
const groups = firstArboard.searchLayers((layer) => layer.type === 'group');
```

## Page

`Page` is a subclass of `LayerContainer`, so it inherit all its properties and methods, but including also the following additions:

#### getSymbols()

Returns an array with all master symbols defined in the page. Example:

```js
const page = sketch.pages[0];
const symbols = page.getSymbols();
```

### SymbolInstance

`SymbolInstance` is a subclass of `Layer`. In addition to all properties and methods, includes also the following properties:

Name | Type | Editable | Description
-----|------|----------|------------
`symbol` | `SymbolMaster` | Yes | The reference to the symbol master
