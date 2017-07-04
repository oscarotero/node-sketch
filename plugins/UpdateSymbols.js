const lib = require('../');

class UpdateSymbols {
    constructor(resources) {
        this.resources = resources;
    }

    run(sketch) {
        return lib.read(this.resources)
            .then(resources => {
                this.symbols = new Map();

                resources.symbolsPage
                    .getAll('symbolMaster')
                    .forEach(master => this.symbols.set(master.name, master));

                sketch.symbolsPage.getAll('symbolMaster').forEach(master => {
                    if (this.symbols.has(master.name)) {
                        const newMaster = master.replaceWith(
                            this.symbols.get(master.name).clone()
                        );
                        newMaster.frame.x = master.frame.x;
                        newMaster.frame.y = master.frame.y;

                        //Update the referencies
                        sketch.pages.forEach(page => {
                            page
                                .getAll(
                                    'symbolInstance',
                                    instance =>
                                        instance.symbolMaster.name === newMaster.name
                                )
                                .forEach(instance => (instance.symbolMaster = newMaster));
                        });
                    }
                });
            });
    }
}

module.exports = UpdateSymbols;