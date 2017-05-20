const Fill = require('./Fill');

class SharedStyle {
    constructor(data) {
        this.data = data;

        this.fills = data.fills.map((fill) => new Fill(fill));
    }

    get styleId() {
        return this.data.sharedObjectId;
    }

    toString() {
        return JSON.stringify(this.toJson());
    }

    toJson() {
        this.data.fills = this.fills.map((fill) => fill.toJson());

        return this.data;
    }
}

module.exports = Color;
