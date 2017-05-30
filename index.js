const fs     = require('fs');
const JSZip  = require('jszip');
const Sketch = require('./src/Sketch');

(function (lib) {
  lib.Artboard                 = require('./src/Artboard');
  lib.Bitmap                   = require('./src/Bitmap');
  lib.Blur                     = require('./src/Blur');
  lib.Border                   = require('./src/Border');
  lib.BorderOptions            = require('./src/BorderOptions');
  lib.Color                    = require('./src/Color');
  lib.CurvePoint               = require('./src/CurvePoint');
  lib.Gradient                 = require('./src/Gradient');
  lib.GradientStop             = require('./src/GradientStop');
  lib.Group                    = require('./src/Group');
  lib.ExportFormat             = require('./src/ExportFormat');
  lib.ExportOptions            = require('./src/ExportOptions');
  lib.Fill                     = require('./src/Fill');
  lib.GraphicsContextSettings  = require('./src/GraphicsContextSettings');
  lib.InnerShadow              = require('./src/InnerShadow');
  lib.LayoutGrid               = require('./src/LayoutGrid');
  lib.MSAttributedString       = require('./src/MSAttributedString');
  lib.MSJSONFileReference      = require('./src/MSJSONFileReference');
  lib.Oval                     = require('./src/Oval');
  lib.Page                     = require('./src/Page');
  lib.Path                     = require('./src/Path');
  lib.Polygon                  = require('./src/Polygon');
  lib.Rect                     = require('./src/Rect');
  lib.Rectangle                = require('./src/Rectangle');
  lib.RulerData                = require('./src/RulerData');
  lib.Shadow                   = require('./src/Shadow');
  lib.ShapeGroup               = require('./src/ShapeGroup');
  lib.ShapePath                = require('./src/ShapePath');
  lib.SharedStyle              = require('./src/SharedStyle');
  lib.SharedStyleContainer     = require('./src/SharedStyleContainer');
  lib.SharedTextStyleContainer = require('./src/SharedTextStyleContainer');
  lib.SimpleGrid               = require('./src/SimpleGrid');
  lib.Slice                    = require('./src/Slice');
  lib.Star                     = require('./src/Star');
  lib.Style                    = require('./src/Style');
  lib.SymbolInstance           = require('./src/SymbolInstance');
  lib.SymbolMaster             = require('./src/SymbolMaster');
  lib.Text                     = require('./src/Text');
  lib.TextStyle                = require('./src/TextStyle');
  lib.Triangle                 = require('./src/Triangle');

  // Read a .sketch file and return an instance of Sketch
  lib.read = function (file) {
    return JSZip.loadAsync(fs.readFileSync(file))
      .then(async (zip) => {
        const document = await zip.file('document.json').async('string');
        const meta = await zip.file('meta.json').async('string');
        const user = await zip.file('user.json').async('string');

        return {
          repo: zip,
          document: JSON.parse(document),
          meta: JSON.parse(meta),
          user: JSON.parse(user)
        };
      })
      .then(async (data) => {
        data.pages = [];

        return Promise.all(
          data.document.pages.map(async (page) => {
            const contents = await data.repo.file(`${page._ref}.json`).async('string');
            return JSON.parse(contents);
          })
        )
        .then((pages) => {
          data.pages = pages;
          return data;
        });
      })
      .then((data) => {
        return new Sketch(
          data.repo,
          data.document,
          data.meta,
          data.user,
          data.pages
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  lib.create = function (parent, data) {
    const constructor = lib.getClass(data._class);

    return new constructor(parent, data);
  };

  lib.getClass = function (type) {
    const className = type.charAt(0).toUpperCase() + type.slice(1);

    if (typeof lib[className] === 'function') {
      return lib[className];
    }

    throw new Error(`Invalid class ${className}`);
  };

})(require('./index'));
