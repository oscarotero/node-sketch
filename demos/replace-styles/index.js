const ns = require('../../');

ns.read('design.sketch')
    .then(sketch => {
        const {layerStyles, textStyles} = sketch;
        
        //Replace all layer and text styles with this:
        const layerStyleToApply = layerStyles.find(style => style.name === 'Primary Button');
        const textStyleToApply = textStyles.find(style => style.name === 'Primary Button');
        
        sketch.pages[0].getAll('style').forEach(style => {
            const sharedStyle = style.sharedStyle;
            
            //If it has a shared style, replace it
            if (sharedStyle) {
                const type = style.getParent()._class;
                
                if (type === 'text') {
                    style.applySharedStyle(textStyleToApply);
                } else {
                    style.applySharedStyle(layerStyleToApply);
                }
            }
        });

        sketch.save('design.result.sketch');
    })
