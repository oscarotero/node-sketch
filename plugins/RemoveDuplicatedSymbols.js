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
                instance.symbolMaster = this.uniqueSymbols.get(
                    instance.symbolMaster.name
                );
            });
        });

        this.duplicatedSymbols.forEach(symbol => symbol.detach());

        return Promise.resolve();
    }
}

module.exports = RemoveDuplicatedSymbols;