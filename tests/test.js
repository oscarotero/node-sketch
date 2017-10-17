const sketch = require('../');
const assert = require('assert');
const JSZip = require('jszip');

describe('Read sketch files', function() {
    it('Should open the file without errors', () => {
        return sketch.read(__dirname + '/test.sketch').then(file => {
            describe('Must exist the sketch data', () => {
                it('file.repo', () => assert(file.repo instanceof JSZip));
                it('file.document', () =>
                    assert(typeof file.document === 'object'));
                it('file.user', () => assert(typeof file.user === 'object'));
                it('file.pages', () => assert(Array.isArray(file.pages)));
            });

            describe('Must read the pages', () => {
                it('page.length', () => assert.equal(file.pages.length, 2));
                it('first page name', () =>
                    assert.equal(file.pages[0].name, 'Page 1'));
                it('second page name', () =>
                    assert.equal(file.pages[1].name, 'Symbols'));
                it('Symbols page', () =>
                    assert.strictEqual(file.pages[1], file.symbolsPage));
            });

            describe('Must read the symbols', () => {
                it('count symbols local symbols', () =>
                    assert.equal(file.localSymbols.length, 2));
                it('count foreign symbols', () =>
                    assert.equal(file.foreignSymbols.length, 2));
                it('count symbols in one page', () =>
                    assert.equal(
                        file.pages[0].getAll('symbolMaster').length,
                        0
                    ));

                it('count instances', () => {
                    assert.equal(
                        file.pages[1].getAll('symbolInstance').length,
                        1
                    );
                    assert.equal(
                        file.pages[0].getAll('symbolInstance').length,
                        3
                    );
                });

                it('get local master of an instance', () => {
                    const instance = file.pages[1].get(
                        'symbolInstance',
                        'circle'
                    );
                    const expected = file.pages[1].get(
                        'symbolMaster',
                        'circle'
                    );
                    assert.strictEqual(instance.symbolMaster, expected);
                });

                it('get foreign master of an instance', () => {
                    const instance = file.pages[0].get(
                        'symbolInstance',
                        'arrow'
                    );
                    const expected = file.foreignSymbols.find(
                        symbol => symbol.name === 'arrow/down'
                    );
                    assert.strictEqual(instance.symbolMaster, expected);
                });
            });

            describe('Must read the shared styles', () => {
                it('count layer styles', () =>
                    assert.equal(file.sharedStyles.length, 2));
                it('first layer style name', () =>
                    assert.equal(file.sharedStyles[0].name, 'style-1'));
                it('second layer style name', () =>
                    assert.equal(file.sharedStyles[1].name, 'style-2'));
                it('count text styles', () =>
                    assert.equal(file.textStyles.length, 2));
                it('first text style name', () =>
                    assert.equal(file.textStyles[0].name, 'style-1'));
                it('second text style name', () =>
                    assert.equal(file.textStyles[1].name, 'style-2'));
            });

            describe('Must read the colors library', () => {
                it('count document colors', () =>
                    assert.equal(file.colors.length, 2));
                it('first color red', () =>
                    assert.equal(file.colors[0].red, 0.9146471088));
                it('second color alpha', () =>
                    assert.equal(file.colors[1].alpha, 1));
            });

            describe('Must read the gradients library', () => {
                it('count document gradients', () =>
                    assert.equal(file.gradients.length, 1));
                it('first gradient type', () =>
                    assert.equal(file.gradients[0].gradientType, 2));
            });

            describe('Must search nodes', () => {
                const page = file.pages[0];

                it('Node.get', () => assert(page.get('text', 'Hello world')));
                it('Node.get#2', () =>
                    assert(
                        page.get('text', text => text.name === 'Hello world')
                    ));
                it('Node.get#3', () =>
                    assert(
                        page.get(
                            text =>
                                text._class === 'text' &&
                                text.name === 'Hello world'
                        )
                    ));
                it('Node.getAll', () =>
                    assert(page.getAll('text', 'Hello world').length, 1));

                const text = page.get('text', 'Hello world');

                it('Node.parent', () => {
                    assert.strictEqual(
                        text.parent,
                        page.get('artboard', 'Insert')
                    );
                    assert.strictEqual(text.getParent(), text.parent);
                });
                it('Node.parent#2', () => {
                    assert.strictEqual(text.getParent('page'), file.pages[0]);
                });
                it('Node.parent#3', () => {
                    assert.strictEqual(text.getParent('sketch'), file);
                });
                it('Node.parent#4', () => {
                    assert.strictEqual(
                        text.getParent(node => node._class === 'page'),
                        file.pages[0]
                    );
                });
            });
        });
    });
});
