/**
 * Plugin to remove duplicated symbols (symbols with the same name)
 *
 * @alias module:plugins.RemoveDuplicatedSymbols
 * @example
 * sketch.use(new RemoveDuplicatedSymbols());
 */
class RemoveDuplicatedSymbols {
    run(sketch) {
        this.uniqueSymbols = new Map();
        this.duplicatedSymbols = [];

        sketch.pages.forEach(page => {
            page.getAll('symbolMaster').forEach(master => {
                if (this.uniqueSymbols.has(master.name)) {
                    this.duplicatedSymbols.push(master);
                } else {
                    this.uniqueSymbols.set(master.name, master);
                }
            });
        });

        sketch.pages.forEach(page => {
            page.getAll('symbolInstance').forEach(instance => {
                const newMaster = this.uniqueSymbols.get(instance.symbolMaster.name);

                if (newMaster) {
                    instance.symbolMaster = newMaster;
                }
            });
        });

        this.duplicatedSymbols.forEach(symbol => symbol.detach());

        return Promise.resolve();
    }
}

module.exports = RemoveDuplicatedSymbols;
