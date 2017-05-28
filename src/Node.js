module.exports = class Node {
    constructor(data) {
        Object.assign(this, data);
    }

    get type() {
        return this._class;
    }
}
