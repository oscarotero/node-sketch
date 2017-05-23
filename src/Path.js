const CurvePoint = require('./CurvePoint');

module.exports = class Path {
    constructor(data) {
        Object.assign(this,
            {
                _class: 'path',
                isClosed: true,
                pointRadiusBehaviour: 1,
                points: []
            },
            data
        );

        this.points = this.points.map((point) => {
            return new CurvePoint(point);
        });
    }
}
