#!/usr/bin/env node

const path = require('path');
const ns = require('./index');
const argv = require('yargs-parser')(process.argv.slice(2), {
    boolean: ['save'],
    default: {
        script: 'node-sketch.js',
        save: false
    }
});

const file = argv._[0];

if (!file) {
    throw new Error('Missing sketch file name');
}

const script = require(path.resolve(argv.script));

ns.read(file)
    .then(sketch => {
        const promise = script(sketch) || Promise.resolve();

        if (argv.save) {
            promise
                .then(() => sketch.save(file))
                .then(() => console.log(`Sketch file successfully saved (${file})`))
        }
    })
