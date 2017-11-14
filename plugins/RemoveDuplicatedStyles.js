/**
 * Plugin to remove duplicated styles (text/shape styles with the same name)
 *
 * @alias module:plugins.RemoveDuplicatedStyles
 * @example
 * sketch.use(new RemoveDuplicatedStyles());
 */
class RemoveDuplicatedStyles {
    run(sketch) {
        this.uniqueSharedStyles = new Map();
        this.uniqueTextStyles = new Map();
        this.duplicatedStyles = [];

        sketch.sharedStyles.forEach(style => {
            if (this.uniqueSharedStyles.has(style.name)) {
                this.duplicatedStyles.push(style);
            } else {
                this.uniqueSharedStyles.set(style.name, style);
            }
        });

        sketch.textStyles.forEach(style => {
            if (this.uniqueTextStyles.has(style.name)) {
                this.duplicatedStyles.push(style);
            } else {
                this.uniqueTextStyles.set(style.name, style);
            }
        });

        sketch.pages.forEach(page => {
            page.getAll('style', style => style.sharedStyle).forEach(style => {
                if (style.parent._class === 'text') {
                    style.sharedStyle = this.uniqueTextStyles.get(
                        style.sharedStyle.name
                    );
                } else {
                    style.sharedStyle = this.uniqueSharedStyles.get(
                        style.sharedStyle.name
                    );
                }
            });
        });

        this.duplicatedStyles.forEach(style => style.detach());

        return Promise.resolve();
    }
}

module.exports = RemoveDuplicatedStyles;
