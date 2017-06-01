module.exports = function(sketch, resources) {
    const symbols = new Map();
    const sharedStyles = new Map();

    resources.symbolsPage
        .getAll('symbolMaster')
        .forEach(master => symbols.set(master.name, master));

    resources.sharedStyles.forEach(style =>
        sharedStyles.set(style.name, style)
    );

    sketch.symbolsPage.getAll('symbolMaster').forEach(master => {
        if (symbols.has(master.name)) {
            const newMaster = master.replaceWith(
                symbols.get(master.name).clone()
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

    sketch.sharedStyles.forEach(sharedStyle => {
        if (sharedStyles.has(sharedStyle.name)) {
            const newSharedStyle = sharedStyle.replaceWith(
                sharedStyles.get(sharedStyle.name).clone()
            );

            //Update the referencies
            sketch.pages.forEach(page => {
                page
                    .getAll(
                        'style',
                        style =>
                            style.sharedObjectID === sharedStyle.do_objectID
                    )
                    .forEach(style => style.applySharedStyle(newSharedStyle));
            });
        }
    });
};
