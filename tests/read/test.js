const assert = require('assert');
const sketch = require('../../index');

describe('Read sketch files', function () {
    it('Should open the file without errors', function () {
        return sketch.read(__dirname + '/design.sketch')
            .then((file) => {
                it('Should read the pages', function () {
                    assert.equal(1, file.pages.length);
                });

                it('Should read the document data', function () {
                    assert.equal('object', typeof file.document);
                    assert.equal('document', file.document._class);
                });

                it('Should read the meta data', function () {
                    assert.equal('object', typeof file.meta);
                    assert.equal('com.bohemiancoding.sketch3', file.meta.app);
                });

                it('Should read the user data', function () {
                    assert.equal('object', typeof file.user);
                });
            });
    });
});
