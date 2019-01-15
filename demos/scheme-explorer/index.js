const ns = require('../../');

ns.read('demo.sketch').then(sketch => sketch.saveDir('demo'));
