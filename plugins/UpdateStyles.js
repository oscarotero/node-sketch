class UpdateStyles {
    constructor(resources) {
        this.resources = resources;
    }

    run (sketch) {
        this.sharedStyles = new Map();

        this.resources.sharedStyles.forEach(style =>
            this.sharedStyles.set(style.name, style)
        );

        sketch.sharedStyles.forEach(sharedStyle => {
            if (this.sharedStyles.has(sharedStyle.name)) {
                const newSharedStyle = sharedStyle.replaceWith(
                    this.sharedStyles.get(sharedStyle.name).clone()
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
    }
}

module.exports = UpdateStyles;
