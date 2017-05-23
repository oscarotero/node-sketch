const GradientStop = require('./GradientStop');

module.exports = class Gradient {
    constructor(data) {
        Object.assign(this,
            {
                _class: 'gradient',
                elipseLength: 0,
                from: "{0, 0}",
                to: "{1, 1}",
                gradientType: 1,
                shouldSmoothenOpacity: false,
                stops: []
            },
            data
        );

        this.stops = this.stops.map((stop) => {
            return new GradientStop(stop);
        });
    }
}
