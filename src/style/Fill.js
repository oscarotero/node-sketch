const Color = require('./Color');

class Fill {
    constructor(data) {
        this.data = data;

        if (data.color) {
            this.color = new Color(data.color);
        }
    }

    get isSolid() {
        return this.data.fillType === 0;
    }

    toString() {
        return JSON.stringify(this.toJson());
    }

    toJson() {
        if (this.color) {
            this.data.color = this.color.toJson();
        }

        return this.data;
    }
}

module.exports = Color;
