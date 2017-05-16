const fs = require('fs');
const JSZip = require('jszip');
const Sketch = require('./Sketch');

module.exports = async function (file) {
    const data = fs.readFileSync(file);
    const zip = await JSZip.loadAsync(data);

    return Promise.all(
        Object.keys(zip.files)
        .map(async (file) => {
            const info = zip.file(file);
            let contents;

            if (file.endsWith('.json')) {
                contents = await info.async('string');
            }

            return {
                name: file,
                contents: contents,
                info: info,
            }
        })
    )
    .then((data) => {
        return new Sketch(data);
    });
};