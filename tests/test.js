const sketch = require('../');
const assert = require('assert');
const JSZip = require('jszip');

describe('Read sketch files', function() {
  it('Should open the file without errors', () => {
    return sketch.read(__dirname + '/original.sketch').then(file => {
      describe('Must exist the sketch data', () => {
        it('file.repo', () => assert(file.repo instanceof JSZip));
        it('file.document', () => assert(typeof file.document === 'object'));
        it('file.user', () => assert(typeof file.user === 'object'));
        it('file.pages', () => assert(Array.isArray(file.pages)));
      });

      describe('Must read the pages', () => {
        it('page.length', () => assert.equal(file.pages.length, 2));
        it('first page name', () => assert.equal(file.pages[0].name, 'Page 1'));
        it('second page name', () =>
          assert.equal(file.pages[1].name, 'Symbols'));
        it('Symbols page', () =>
          assert.strictEqual(file.pages[1], file.getSymbolsPage()));
      });

      describe('Must read the symbols', () => {
        it('count symbols', () => {
          assert.equal(file.getSymbolsPage().getAll('symbolMaster').length, 2);
          assert.equal(file.pages[0].getAll('symbolMaster').length, 0);
        });

        it('count instances', () => {
          assert.equal(file.pages[1].getAll('symbolInstance').length, 1);
          assert.equal(file.pages[0].getAll('symbolInstance').length, 2);
        });

        it('instance.getSymbolMaster()', () => {
          const instance = file.pages[1].get('symbolInstance', 'circle');
          const expected = file.pages[1].get('symbolMaster', 'circle');
          assert.strictEqual(instance.getSymbolMaster(), expected);
        });
      });

      describe('Must read the shared styles', () => {
        it('count layer styles', () =>
          assert.equal(file.getAllSharedStyles().length, 2));
        it('first layer style name', () =>
          assert.equal(file.getAllSharedStyles()[0].name, 'style-1'));
        it('second layer style name', () =>
          assert.equal(file.getAllSharedStyles()[1].name, 'style-2'));
        it('count text styles', () =>
          assert.equal(file.getAllTextStyles().length, 2));
        it('first text style name', () =>
          assert.equal(file.getAllTextStyles()[0].name, 'style-1'));
        it('second text style name', () =>
          assert.equal(file.getAllTextStyles()[1].name, 'style-2'));
      });
    });
  });
});
