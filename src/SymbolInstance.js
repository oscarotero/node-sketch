const Layer = require('./Layer');

module.exports = class SymbolInstance extends Layer {
    constructor(parent, data) {
        super(parent, data, {
            _class: 'symbolInstance',
            resizingConstraint: 63,
            rotation: 0,
            horizontalSpacing: 0,
            verticalSpacing: 0,
            masterInfluenceEdgeMinXPadding: 5,
            masterInfluenceEdgeMaxXPadding: 5,
            masterInfluenceEdgeMinYPadding: 5,
            masterInfluenceEdgeMaxYPadding: 5,
            symbolID: null
        });

        if ('overrides' in this) {
            this.overrides = this.overrides.map((override) => {
                throw new Error('TODO');
                return override;
            });
        }
    }
}
