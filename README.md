# 💎 node-sketch
Javascript library to manipulate sketch files

## Install

```sh
npm install node-sketch
```

## Example:

```js
const ns = require('node-sketch');

ns.read('design.sketch').then((sketch) => {

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

# API

## The class inheritance

This is a list of all classes and subclasses provided

- `Sketch`
- `Node`
    - `Artboard`
    - `Bitmap`
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
    - `LayoutGrid`
    - `MSAttributedString`
    - `MSJSONFileReference`
    - `Page`
    - `Path`
    - `Rect`
    - `RulerData`
    - `Shadow`
    - `SharedStyle`
    - `SharedStyleContainer`
    - `SharedTextStyleContainer`
    - `Style`
    - `SimpleGrid`
    - `Style`
    - `TextStyle`
        - `Group`
        - `Oval`
        - `Polygon`
        - `Rectangle`
        - `ShapeGroup`
        - `ShapePath`
        - `Slice`
        - `Star`
        - `SymbolInstance`
        - `SymbolMaster`
        - `Text`
        - `Triangle`
