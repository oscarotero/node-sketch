const ns = require('../../');

ns.read('design.sketch')
    .then(sketch => {
        const {layerStyles, textStyles} = sketch;

        //Replace all layer and text styles with this:
        const layerStyleToApply = layerStyles.find(style => style.name === 'Primary Button');
        const textStyleToApply = textStyles.find(style => style.name === 'Primary Button');

        sketch.pages[0].getAll('style').forEach(style => {
            const parent = style.getParent();
            const styleId = parent.sharedStyleID;

            //Search the current layer style applied
            const layerStyle = layerStyles.find(style => style.do_objectID === styleId);
            
            if (layerStyle) {
                console.log(layerStyle.name);

                //Apply the new layer style
                parent.set('style', layerStyleToApply.value);
                parent.sharedStyleID = layerStyleToApply.do_objectID;
            }

            //Search the current text style applied
            const textStyle = textStyles.find(style => style.do_objectID === styleId);

            if (textStyle) {
                console.log(textStyle.name);

                //Apply the new text style
            }
            
            sketch.save('design.result.sketch');
            sketch.saveDir('design');
        });
    })
