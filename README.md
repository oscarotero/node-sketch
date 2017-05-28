# node-sketch
Javascript library to manipulate sketch files

## Install

```sh
npm install node-sketch
```

## Example:

```js
const ns = require('node-sketch');

ns.read('design.sketch').then((sketch) => {

    //Get the 'Symbols' page
    const symbolsPage = sketch.getSymbolsPage();

    //Search the symbol named 'button'
    const buttonSymbol = symbolsPage.findSymbol(symbol => symbol.name === 'button');

    //Search all instances of a symbol named 'old-button' and replace it with 'button'
    sketch
        .findAllLayers('symbolInstance', layer => layer.symbol.name === 'old-button')
        .forEach(symbolInstance => symbolInstance.symbol = buttonSymbol);

    //Save the result
    sketch.save('modified-design.sketch');
});
```

# API

## The Class inheritance

This is a list of all classes and subclasses provided

- [`Sketch`](#sketch)
- [`Node`](#node)
    - `Blur`
    - `Border`
    - `BorderOptions`
    - `Color`
    - `CurvePoint`
    - `ExportFormat`
    - `ExportOptions`
    - `Fill`
    - `Gradient`
    - `GradientStop`
    - `GraphicsContextSettings`
    - `InnerShadow`
    - `MSAttributedString`
    - `MSJSONFileReference`
    - `Path`
    - `Rect`
    - `RulerData`
    - `Shadow`
    - `Style`
    - `TextStyle`
    - [`Layer`](#layer)
        - `Bitmap`
        - `Oval`
        - `Polygon`
        - `Rectangle`
        - `ShapePath`
        - `Slice`
        - `Star`
        - [`SymbolInstance`](#symbolinstance)
        - `Text`
        - `Triangle`
        - [`LayerContainer`](#layercontainer)
            - `Artboard`
            - `Group`
            - [`Page`](#page)
            - `ShapeGroup`
            - `SymbolMaster`

## Sketch

The `Sketch` instance contain all sketch data (pages, artboards, symbols, etc). It's the object returned by `sketch.read`. (Note that the reading is async):

```js
const ns = require('node-sketch');

ns.read('design.sketch').then((sketch) => {
    console.log(sketch instanceof ns.Sketch); //true
});
```

It contains the following properties:

Name | Type | Description
-----|------|-------------
`repo` | `JSZip` | A instance of [JSZip](https://stuk.github.io/jszip/) with the sketch file
`document` | `Object` | The document data
`meta` | `Object` | The meta data
`user` | `Object` | The user data
`pages` | `Array` | The pages in the document

An also some useful methods:

#### findLayer(type, [condition])

Returns the first layer (artboard, group, shape, etc) matching with the type and the condition found in any of the pages of the sketch. Example:

```js
//Get the first 'group' found
const group = sketch.findLayer('group');

//Get the first 'group' found named 'items'
const group = sketch.findLayer('group', group => group.name === 'items');
```

#### findAllLayers(type, [condition])

Returns an array with all elements matching with the type and condition found in any of the pages of the sketch. Example:

```js
//Get all symbol instances
const instances = sketch.findAllLayers('symbolInstance');

//Get all symbol instances named 'my-symbol'
const instances = sketch.findAllLayers('symbolInstance', symbol => symbol.name === 'my-symbol');
```

#### getSymbolsPage()

Returns the 'Symbols' page if exists. Example:

```js
const symbolsPage = sketch.getSymbolsPage();
```

#### save(path)

Saves the sketch file

```js
sketch.save('awesome-design.sketch').then(() => {
    console.log('file saved successfuly');
});
```

## Node

The `Node` class is the base class extended by all subclasses. Provides the following properties and methods:

Name | Type | Editable | Description
-----|------|----------|------------
parent | `Node/Sketch` | No | The parent element. If the element is in the top of the tree (it's a `Page`), returns the `Sketch` instance.

#### findParent(type, [condition])

Find an ancestor node matching with the type and condition. Example:

```js
//Get the page in which the element is placed
const page = rectangle.findParent('page');

//Get the sketch of the page
const sketch = page.parent;
```

## Layer

The `Layer` class extends `Node`, so inherit the same methods and properties, but with the following additions:

Name | Type | Editable | Description
-----|------|----------|------------
id | `string` | No | Returns an unique id of the node. It's simply a shortcut of `do_objectID`.

#### detach()

Removes the layer from its parent. It's used if you want to move or remove a layer.

```js
//Removes a rectangle
const rectangle = page.findLayer('rectangle').detach();
```

## LayerContainer

Some layers can contain other layers (to build the layer tree). The `LayerContainer` class extends `Layer` to inherit the same methods and properties but adding the following methods:

#### findLayer(type, [condition])

Returns the first layer matching with the type and the condition. Example:

```js
//Get the first 'group' found in a page
const rectangle = page.findLayer('group');

//Get the first 'group' found named 'items'
const group = page.findLayer('group', group => group.name === 'items');
```

#### findAllLayers(type, [condition])

Returns an array with all elements matching with the type and condition. Example:

```js
//Get all symbol instances
const instances = page.findAllLayers('symbolInstance');

//Get all symbol instances named 'my-symbol'
const instances = page.findAllLayers('symbolInstance', symbol => symbol.name === 'my-symbol');
```

#### addLayer(layer, [position])

Add a layer as a child of other layer. If `position` is `undefined`, insert the layer in the last position.

```js
//Removes a rectangle
const rectangle = page.findLayer('rectangle').detach();

//Select the shapeGroup named 'my-shape'
const group = page.findLayer('shapeGroup', node => node.name === 'my-shape');

//Add the rectangle to the group
group.addLayer(rectangle);
```

## Page

`Page` is a subclass of `LayerContainer`, so it inherit all its properties and methods, but including also the following additions:

#### findSymbol([condition])

Returns the first SymbolMaster matching with the condition. Example:

```js
const page = sketch.getSymbolsPage();

//Get the symbol named 'button'
const button = page.findSymbol(symbol => symbol.name === 'button');
```

#### findAllSymbols([condition])

Returns an array with all SymbolMaster matching with the condition. Example:

```js
const page = sketch.getSymbolsPage();

//Get the symbol starting with 'icon/'
const icons = page.findSymbol(symbol => symbol.name.startsWith('icon/'));
```

## SymbolInstance

`SymbolInstance` is a subclass of `Layer`. In addition to all properties and methods, includes also the following properties:

Name | Type | Editable | Description
-----|------|----------|------------
`symbol` | `SymbolMaster` | Yes | The reference to the symbol master

```js
//Get the first page
cons page = sketch.pages[0];

//Search all instances of symbols
const symbolInstances = page.findAllLayers('symbolInstances');

symbolInstances.forEach((instance) => {
    console.log('The symbol ' + instance.name);
    console.log('is an instance of the symbol ' + instance.symbol.name);
});
```
