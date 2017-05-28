const Node       = require('./Node');
const CurvePoint = require('./CurvePoint');

module.exports = class Path extends Node {
    constructor(data) {
        super(data);

        this.points = this.points.map((point) => new CurvePoint(point));
    }
}
