const Artboard = require('./Artboard');
const Page    = require('./Page');

class Layer extends Array {
    static create(parent, data) {
        switch (data._class) {
            case Artboard.type:
                return new Artboard(sketch, data);

            case Page.type:
                return new Page(sketch, data);

            default:
                return new Layer(sketch, data);
        }
    }

    constructor(parent, data) {
        this.parent = parent;
        this.data = data;

        if (Array.isArray(data.layers)) {
            data.layers.forEach((layerData) => this.push(Layer.create(this, layerData)));
        }
    }

    get id() {
        return this.data.do_objectID;
    }

    get name() {
        return this.data.name;
    }

    get type() {
        return this.data._class;
    }

    get width() {
        return this.data.frame.width;
    }

    set width(val) {
        this.data.frame.width = val;
    }

    get height() {
        return this.data.frame.height;
    }

    set height(val) {
        this.data.frame.height = val;
    }

    get x() {
        return this.data.frame.x;
    }

    set x(val) {
        this.data.frame.x = val;
    }

    get y() {
        return this.data.frame.y;
    }

    set y(val) {
        this.data.frame.y = val;
    }

    getChild(condition) {
        return searchLayer(this.sketch, this.data.layers, condition, false);
    }

    getChildren(condition) {
        return searchAllLayers(this.sketch, this.data.layers, condition, false, []);
    }

    get(condition) {
        return searchLayer(this.sketch, this.data.layers, condition, true);
    }

    getAll(condition, recursive) {
        return searchAllLayers(this.sketch, this.data.layers, condition, true, []);
    }

    toString() {
        return JSON.stringify(this.data);
    }
}

module.exports = Layer;

function searchLayer (sketch, layers, condition, recursive) {
    if (!layers) {
        return undefined;
    }

    condition = condition || 0;

    if (typeof condition === 'number') {
        if (layers[condition]) {
            return sketch.getLayerInstance(layers[condition]);
        }
    } else if (typeof condition === 'function') {
        const result = layers.find(condition);

        if (result) {
            return sketch.getLayerInstance(result);
        }
    } else if (typeof condition === 'string') {
        const result = layers.find((layer) => layer._class === condition);

        if (result) {
            return sketch.getLayerInstance(result);
        }
    } else {
        throw new Error('Invalid argument' + (typeof condition));
    }

    if (recursive) {
        for (let i = 0, t = layers.length; i < t; i++) {
            if (Array.isArray(layers[i].layers)) {
                let r = searchLayer(sketch, layers[i].layers, condition, recursive);

                if (r) {
                    return r;
                }
            }
        }
    }
}

function searchAllLayers (sketch, layers, condition, recursive, result) {
    if (!layers) {
        return result;
    }

    if (condition === undefined) {
        layers
            .slice()
            .map((layer) => sketch.getLayerInstance(layer))
            .forEach((layer) => result.push(layer));
    } else if (typeof condition === 'function') {
        layers
            .filter(condition)
            .map((layer) => sketch.getLayerInstance(layer))
            .forEach((layer) => result.push(layer));
    } else if (typeof condition === 'string') {
        layers
            .filter((layer) => layer._class === condition)
            .map((layer) => sketch.getLayerInstance(layer))
            .forEach((layer) => result.push(layer));
    } else {
        throw new Error('Invalid argument' + (typeof condition));
    }

    if (!recursive) {
        return result;
    }

    for (let i = 0, t = layers.length; i < t; i++) {
        if (Array.isArray(layers[i].layers)) {
            searchAllLayers(sketch, layers[i].layers, condition, recursive, result);
        }
    }

    return result;
}
