class Layer {
    constructor(sketch, data) {
        this.sketch = sketch;
        this.data = data;
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
