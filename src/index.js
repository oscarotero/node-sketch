const fs = require('fs');
const JSZip = require('jszip');

(function (lib) {
    lib.Sketch   = require('./Sketch');
    lib.Layer    = require('./Layer');
    lib.Artboard = require('./Artboard');
    lib.Page     = require('./Page');

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
        switch (data._class) {
            case lib.Artboard.type:
                return new lib.Artboard(parent, data);

            case lib.Page.type:
                return new lib.Page(parent, data);

            default:
                return new lib.Layer(parent, data);
        }
    };

})(require('./index'));
