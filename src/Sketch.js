const fs = require('fs');
const Page = require('./Page');
const SharedStyleContainer = require('./SharedStyleContainer');
const SharedTextStyleContainer = require('./SharedTextStyleContainer');

class Sketch {
  constructor(repo, document, meta, user, pages) {
    this._class = 'sketch';
    this.repo = repo;
    this.document = document;
    this.meta = meta;
    this.user = user;
    this.pages = pages.map(page => new Page(this, page));

    //To-do: create Document class
    this.document.layerStyles = new SharedStyleContainer(
      this,
      this.document.layerStyles
    );
    this.document.layerTextStyles = new SharedTextStyleContainer(
      this,
      this.document.layerTextStyles
    );
  }

  find(type, condition) {
    for (let page of this.pages) {
      let node = page.find(type, condition);

      if (node) {
        return node;
      }
    }
  }

  findAll(type, condition, result) {
    result = result || [];

    for (let page of this.pages) {
      page.findAll(type, condition).forEach(node => result.push(node));
    }

    return result;
  }

  findLayer(type, condition) {
    for (let page of this.pages) {
      let layer = page.findLayer(type, condition);

      if (layer) {
        return layer;
      }
    }
  }

  findAllLayers(type, condition, result) {
    result = result || [];

    for (let page of this.pages) {
      page.findAllLayers(type, condition).forEach(layer => result.push(layer));
    }

    return result;
  }

  findSharedStyle(condition) {
    return this.document.layerStyles.objects.find(
      style => !condition || condition(style)
    );
  }

  findAllSharedStyles(condition) {
    return this.document.layerStyles.objects.filter(
      style => !condition || condition(style)
    );
  }

  findTextStyle(condition) {
    return this.document.layerTextStyles.objects.find(
      style => !condition || condition(style)
    );
  }

  findAllTextStyles(condition) {
    return this.document.layerTextStyles.objects.filter(
      style => !condition || condition(style)
    );
  }

  getSymbolsPage() {
    return this.pages.find(page => page.name === 'Symbols');
  }

  //Save document as sketch file
  save(file) {
    const pagesFolder = this.repo.folder('pages');

    this.document.pages = this.pages.map(page => {
      this.repo.file(`pages/${page.do_objectID}.json`, JSON.stringify(page));

      return {
        _class: 'MSJSONFileReference',
        _ref_class: 'MSImmutablePage',
        _ref: `pages/${page.do_objectID}`
      };
    });

    this.repo.file('document.json', JSON.stringify(this.document));
    this.repo.file('meta.json', JSON.stringify(this.meta));
    this.repo.file('user.json', JSON.stringify(this.user));

    return new Promise((resolve, reject) => {
      this.repo
        .generateNodeStream({
          type: 'nodebuffer',
          streamFiles: true,
          compression: 'DEFLATE'
        })
        .pipe(fs.createWriteStream(file))
        .on('finish', () => {
          resolve(file);
        })
        .on('error', err => {
          reject(err);
        });
    });
  }
}

module.exports = Sketch;
