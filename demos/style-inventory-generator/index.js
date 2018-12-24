const sketch = require('../../');
const fs = require('fs');

async function run() {
    const file = await sketch.read(__dirname + '/Buttons.sketch');
    const styles = {};

    file.symbolsPage.getAll('symbolMaster').forEach(master => {
        const style = {};
        master.layers.forEach(layer => {
            switch (layer._class) {
                case 'text':
                    style[layer.name] = getTextStyle(layer);
                    break;
                case 'rectangle':
                    style[layer.name] = getShapeStyle(layer);
                    break;
            }
        });

        styles[master.name] = style;
    });

    fs.writeFileSync(__dirname + '/inventory.json', JSON.stringify(styles, null, 2));
    console.log(styles);
}

run();

function getTextStyle(layer) {
    const textStyle = layer.get('textStyle');
    const color = textStyle.get('color');
    const paragraph = textStyle.get('paragraphStyle');
    const font = textStyle.get('fontDescriptor');

    const alignments = ['left', 'right', 'center', 'justify'];

    return {
        color: toRgba(color),
        alignment: alignments[paragraph.alignment],
        font: font.attributes.name,
        size: font.attributes.size,
        lineHeight: paragraph.maximumLineHeight,
        tracking: parseFloat(textStyle.encodedAttributes.kerning.toFixed(2))
    };
}

function getShapeStyle(layer) {
    const color = layer.get('fill').get('color');
    const shadow = layer.get('shadow');
    const rect = layer.get('rect');

    const style = {
        color: toRgba(color),
        borderRadius: layer.fixedRadius,
        width: rect.width,
        height: rect.height
    };

    if (shadow) {
        style.shadow = {
            blur: shadow.blurRadius,
            color: toRgba(shadow.color),
            x: shadow.offsetX,
            y: shadow.offsetY
        };
    }

    return style;
}

function toRgba(color) {
    const rgba = [
        Math.round(color.red * 255),
        Math.round(color.green * 255),
        Math.round(color.blue * 255),
        color.alpha
    ];

    return rgba.join(',');
}
