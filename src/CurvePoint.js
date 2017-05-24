module.exports = class CurvePoint {
    constructor(data) {
        Object.assign(this,
            {
                _class: 'curvePoint',
                cornerRadius: 0,
                curveFrom: "{0, 0}",
                curveMode: 1,
                curveTo: "{0, 0}",
                hasCurveFrom: false,
                hasCurveTo: false,
                point: "{0, 0}"
            },
            data
        );
    }
}
