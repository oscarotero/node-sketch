const sketch = require('../');

sketch
    .read(__dirname + '/example.sketch')
    .then(file => {
        file
            .use(new sketch.plugins.RemoveDuplicatedSymbols())
            .use(new sketch.plugins.RemoveDuplicatedStyles())
            .use(
                new sketch.plugins.UpdateStyles(__dirname + '/resources.sketch')
            )
            .use(
                new sketch.plugins.UpdateSymbols(
                    __dirname + '/resources.sketch'
                )
            )
            .use(new sketch.plugins.ExportImages(__dirname))
            .save(__dirname + '/result.sketch');
    })
    .catch(err => {
        console.error('Error reading the sketch file');
        console.error(err);
    });
