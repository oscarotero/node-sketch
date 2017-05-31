const fs     = require('fs');
const JSZip  = require('jszip');
const Sketch = require('./src/Sketch');

(function (lib) {

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
      });
  };

  const Node = require('./src/Node');
  const classes = {
    page:           require('./src/Page'),
    sharedStyle:    require('./src/SharedStyle'),
    style:          require('./src/Style'),
    symbolInstance: require('./src/SymbolInstance')
  };

  lib.create = function (parent, data) {
    if (data._class in classes) {
      return new classes[data._class](parent, data);
    }

    return new Node(parent, data);
  };

})(require('./index'));
