const ns = require('../../');

ns.read('logo.sketch')
    .then(sketch => {
        sketch
            .exportPreviews('demo')
            .then(() => sketch.exportTextPreviews('demo-texts'));
    })
