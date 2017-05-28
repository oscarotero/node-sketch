const Node         = require('./Node');
const GradientStop = require('./GradientStop');

module.exports = class Gradient extends Node {
    constructor(data) {
        super(data);

        this.stops = this.stops.map((stop) => new GradientStop(stop));
    }
}
