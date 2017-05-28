const Node          = require('./Node');
const BorderOptions = require('./BorderOptions');
const Shadow        = require('./Shadow');
const Border        = require('./Border');
const Fill          = require('./Fill');
const TextStyle     = require('./TextStyle');

module.exports = class Style extends Node {
    constructor(data) {
        super(data);

        if ('borderOptions' in this) {
            this.borderOptions = new BorderOptions(this.borderOptions);
        }

        if ('textStyle' in this) {
            this.textStyle = new TextStyle(this.textStyle);
        }

        if (Array.isArray(this.fills)) {
            this.fills = this.fills.map((fill) => new Fill(fill));
        }

        if (Array.isArray(this.shadows)) {
            this.shadows = this.shadows.map((shadow) => new Shadow(shadow));
        }

        if (Array.isArray(this.borders)) {
            this.borders = this.borders.map((border) => new Border(border));
        }
    }
}
