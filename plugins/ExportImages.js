const path = require('path');

class ExportImages {
    constructor(dest) {
        this.dest = dest;
    }

    run(sketch) {
        const images = [];

        sketch.pages.forEach(page => {
            page.getAll('MSJSONFileReference').forEach(ref => {
                images.push(ref);
            });
        });

        return Promise.all(images.map(img => {
            return img.export(this.dest);
        }));
    }
}

module.exports = ExportImages;