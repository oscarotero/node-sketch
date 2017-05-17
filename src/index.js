const fs = require('fs');
const JSZip = require('jszip');
const Sketch = require('./Sketch');

module.exports = async function (file) {
    const zip = await JSZip.loadAsync(fs.readFileSync(file));
    const data = await zip.file('document.json').async('string');

    return new Sketch(zip, {
    	document: JSON.parse(data)
    });
};