const fs = require('fs');
const JSZip = require('jszip');

(function (lib) {
    lib.Color                  = require('./src/Color');
    lib.Rect                   = require('./src/Rect');
    lib.ExportOptions          = require('./src/ExportOptions');
    lib.RulerData              = require('./src/RulerData');
    lib.Border                 = require('./src/Border');
    lib.BorderOptions          = require('./src/BorderOptions');
    lib.CurvePoint             = require('./src/CurvePoint');
    lib.Path                   = require('./src/Path');
    lib.GradientStop           = require('./src/GradientStop');
    lib.Gradient               = require('./src/Gradient');
    lib.Oval                   = require('./src/Oval');
    lib.Rectangle              = require('./src/Rectangle');
    lib.Star                   = require('./src/Star');
    lib.Polygon                = require('./src/Polygon');
    lib.Triangle               = require('./src/Triangle');
    lib.TextStyle              = require('./src/TextStyle');
    lib.GraphicContextSettings = require('./src/GraphicContextSettings');
    lib.Shadow                 = require('./src/Shadow');
    lib.MSJSONFileReference    = require('./src/MSJSONFileReference');
    lib.Fill                   = require('./src/Fill');
    lib.Style                  = require('./src/Style');


    lib.Sketch         = require('./src/Sketch');
    /*
    lib.Layer          = require('./src/Layer');
    lib.Artboard       = require('./src/Artboard');
    lib.Page           = require('./src/Page');
    lib.SymbolMaster   = require('./src/SymbolMaster');
    lib.SymbolInstance = require('./src/SymbolInstance');
    lib.ShapeGroup     = require('./src/ShapeGroup');
    */

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
                return new lib.Sketch(
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
        const className = data._class.charAt(0).toUpperCase() + data._class.slice(1);

        if (typeof lib[className] === 'function') {
            return new lib[className](parent, data);
        }

        return new lib.Layer(parent, data);
    };

})(require('./index'));
