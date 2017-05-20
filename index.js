const fs = require('fs');
const JSZip = require('jszip');

(function (lib) {
    lib.Sketch         = require('./src/Sketch');
    lib.Layer          = require('./src/Layer');
    lib.Artboard       = require('./src/Artboard');
    lib.Page           = require('./src/Page');
    lib.SymbolMaster   = require('./src/SymbolMaster');
    lib.SymbolInstance = require('./src/SymbolInstance');
    lib.ShapeGroup     = require('./src/ShapeGroup');

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
