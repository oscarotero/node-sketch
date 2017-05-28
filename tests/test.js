const sketch = require('../');

sketch.read(__dirname + '/original.sketch').then(function (file) {
    file.save(__dirname + '/result.sketch');
});

