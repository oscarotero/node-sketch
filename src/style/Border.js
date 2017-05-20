const Color = require('./Color');

class Border {
    constructor(data) {
        this.data = data;

        if (data.color) {
            this.color = new Color(data.color);
        }
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

module.exports = Border;
