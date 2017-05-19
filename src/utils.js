module.exports.mapSymbols = function (values, map) {
    map = map || new Map();

    values.forEach((value) => {
        map.set(value.symbolId, value);
    });

    return map;
}
