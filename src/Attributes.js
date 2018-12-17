const _attributes = Symbol.for('attributes');
const Node = require('./Node');
const bplist = require('bplist-parser');

/**
 * Represents a dictionary of attributes
 *
 * @extends {Node}
 *
 * @property {object|undefined} attributes - Object containing the parsed attributes (they are stored as BASE64 encoded Binary Plists)
 *
 * @example
 * //Get an MSAttributedString instance
 * const node = sketch.pages[0].get('MSAttributedString');
 *
 * //Parse and return the attributes
 * console.log(node.attributes)
 */
class Attributes extends Node {
    get attributes() {
        if (this[_attributes]) {
            return this[_attributes];
        }

        const attributes = parseArchive(this.archivedAttributedString._archive);

        this[_attributes] = attributes;
        return attributes;
    }
}

module.exports = Attributes;

function parseArchive(stringArchive) {
    const archive = bplist.parseBuffer(Buffer.from(stringArchive, 'base64'));
    const result = {};
    const objects = archive[0].$objects;
    const root = archive[0].$top.root.UID;
    const rootObject = objects[root];

    for (var key in rootObject) {
        if (rootObject[key].UID) {
            result[key] = getReferenceById(rootObject[key].UID);
        }
    }

    return result;

    function getReferenceById(id) {
        const object = objects[id];

        if (typeof object === 'string' || typeof object === 'number' || typeof object === 'boolean') {
            return object;
        }

        const reference = {};

        if (typeof object === 'object') {
            for (let index in object) {
                if (object[index].UID) {
                    reference[index] = getReferenceById(object[index].UID);
                } else if (Array.isArray(object[index]) && index !== 'NS.keys' && index !== 'NS.objects') {
                    reference[index] = [];
                    object[index].forEach(ao => {
                        if (ao.UID) {
                            reference[index].push(getReferenceById(ao.UID));
                        } else {
                            reference[index].push(ao);
                        }
                    });
                } else if (index !== 'NS.keys' && index !== 'NS.objects') {
                    reference[index] = object[index];
                }
            }
        }

        if (object['NS.keys']) {
            object['NS.keys'].forEach((keyObj, index) => {
                const key = getReferenceById(keyObj.UID);
                reference[key] = getReferenceById(object['NS.objects'][index].UID);
            });
        }

        return reference;
    }
}
