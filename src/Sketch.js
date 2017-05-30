const fs = require('fs');
const Page = require('./Page');
const SharedStyleContainer = require('./SharedStyleContainer');
const SharedTextStyleContainer = require('./SharedTextStyleContainer');

/**
 * This class represents the sketch file and all this content.
 * @property {JSZip} repo The instance of JSZip containing the raw data
 * @property {Object} document The document data
 * @property {Object} meta The meta data
 * @property {Object} user The user data
 * @property {Page[]} array with all pages of the document
 */
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

  /**
   * Returns all shared styles defined in the document.
   * @example
   * //Get all shared styles
   * const sharedStyles = sketch.getSharedStyles();
   *
   * @return {SharedStyle[]}
   */
  getSharedStyles() {
    return this.document.layerStyles.objects;
  }

  /**
   * Returns all text styles defined in the document.
   * @example
   * //Get all text styles
   * const textStyles = sketch.getTextStyles();
   *
   * @return {SharedStyle[]}
   */
  getTextStyles() {
    return this.document.layerTextStyles.objects;
  }

  /**
   * Returns the "Symbols" page if exists
   *
   * @return {Page|undefined}
   */
  getSymbolsPage() {
    return this.pages.find(page => page.name === 'Symbols');
  }

  /**
   * Save the document as a sketch file
   *
   * @param  {string} file - The file path
   */
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
