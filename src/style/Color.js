class Color {
    constructor(data) {
        this.data = data;
    }

    get rgb() {
        return [
            this.data.red * 255,
            this.data.blue * 255,
            this.data.green * 255
        ];
    }

    set rgb(rgb) {
        this.data.red = rgb[0] / 255;
        this.data.blue = rgb[1] / 255;
        this.data.green = rgb[2] / 255;
    }

    get alpha() {
        return this.data.alpha;
    }

    set alpha(alpha) {
        this.data.alpha = alpha;
    }

    toString() {
        return JSON.stringify(this.toJson());
    }

    toJson() {
        return this.data;
    }
}

module.exports = Color;
