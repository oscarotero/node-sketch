const assert = require('assert');
const sketch = require('../index');

describe('Color', function () {
    it('Create empty instances', function () {
        const instance = new sketch.Color();

        assert.equal('{"_class":"color","red":0,"green":0,"blue":0,"alpha":1}', JSON.stringify(instance));
    });

    it('Create instances', function () {
        const instance = new sketch.Color({red: 1, blue: 0.5});

        assert.equal('{"_class":"color","red":1,"green":0,"blue":0.5,"alpha":1}', JSON.stringify(instance));
    });
});

describe('Rect', function () {
    it('Create empty instances', function () {
        const instance = new sketch.Rect();

        assert.equal('{"_class":"rect","constrainProportions":false,"x":0,"y":0,"width":0,"height":0}', JSON.stringify(instance));
    });

    it('Create instances', function () {
        const instance = new sketch.Rect({width: 100, height: 100});

        assert.equal('{"_class":"rect","constrainProportions":false,"x":0,"y":0,"width":100,"height":100}', JSON.stringify(instance));
    });
});

describe('ExportOptions', function () {
    it('Create empty instances', function () {
        const instance = new sketch.ExportOptions();

        assert.equal('{"_class":"exportOptions","exportFormats":[],"includedLayerIds":[],"layerOptions":0,"shouldTrim":false}', JSON.stringify(instance));
    });

    it('Create instances', function () {
        const instance = new sketch.ExportOptions({shouldTrim: true});

        assert.equal('{"_class":"exportOptions","exportFormats":[],"includedLayerIds":[],"layerOptions":0,"shouldTrim":true}', JSON.stringify(instance));
    });
});

describe('RulerData', function () {
    it('Create empty instances', function () {
        const instance = new sketch.RulerData();

        assert.equal('{"_class":"rulerData","base":0,"guides":[]}', JSON.stringify(instance));
    });

    it('Create instances', function () {
        const instance = new sketch.RulerData({base: 5, guides: [34, 56]});

        assert.equal('{"_class":"rulerData","base":5,"guides":[34,56]}', JSON.stringify(instance));
    });
});

describe('Border', function () {
    it('Create empty instances', function () {
        const instance = new sketch.Border();

        assert.equal('{"_class":"border","isEnabled":true,"fillType":0,"position":1,"thickness":1,"color":{"_class":"color","red":0,"green":0,"blue":0,"alpha":1}}', JSON.stringify(instance));
    });

    it('Create instances', function () {
        const instance = new sketch.Border({fillType: 1, color: {red: 1, green: 1, blue: 0.5, alpha: 0.35}});

        assert.equal('{"_class":"border","isEnabled":true,"fillType":1,"position":1,"thickness":1,"color":{"_class":"color","red":1,"green":1,"blue":0.5,"alpha":0.35}}', JSON.stringify(instance));
    });
});

describe('BorderOptions', function () {
    it('Create empty instances', function () {
        const instance = new sketch.BorderOptions();

        assert.equal('{"_class":"borderOptions","isEnabled":true,"dashPattern":[],"lineCapStyle":0,"lineJoinStyle":0}', JSON.stringify(instance));
    });

    it('Create instances', function () {
        const instance = new sketch.BorderOptions({lineCapStyle: 1, lineJoinStyle: 1});

        assert.equal('{"_class":"borderOptions","isEnabled":true,"dashPattern":[],"lineCapStyle":1,"lineJoinStyle":1}', JSON.stringify(instance));
    });
});

describe('CurvePoint', function () {
    it('Create empty instances', function () {
        const instance = new sketch.CurvePoint();

        assert.equal('{"_class":"curvePoint","cornerRadius":0,"curveFrom":"{0, 0}","curveMode":1,"curveTo":"{0, 0}","hasCurveFrom":false,"hasCurveTo":false,"point":"{0, 0}"}', JSON.stringify(instance));
    });

    it('Create instances', function () {
        const instance = new sketch.CurvePoint({cornerRadius: 5, curveMode: 0});

        assert.equal('{"_class":"curvePoint","cornerRadius":5,"curveFrom":"{0, 0}","curveMode":0,"curveTo":"{0, 0}","hasCurveFrom":false,"hasCurveTo":false,"point":"{0, 0}"}', JSON.stringify(instance));
    });
});

describe('Path', function () {
    it('Create empty instances', function () {
        const instance = new sketch.Path();

        assert.equal('{"_class":"path","isClosed":true,"pointRadiusBehaviour":1,"points":[]}', JSON.stringify(instance));
    });

    it('Create instances', function () {
        const instance = new sketch.Path({isClosed: false, points: [{cornerRadius: 5}]});

        assert.equal('{"_class":"path","isClosed":false,"pointRadiusBehaviour":1,"points":[{"_class":"curvePoint","cornerRadius":5,"curveFrom":"{0, 0}","curveMode":1,"curveTo":"{0, 0}","hasCurveFrom":false,"hasCurveTo":false,"point":"{0, 0}"}]}', JSON.stringify(instance));
    });
});

describe('GradientStop', function () {
    it('Create empty instances', function () {
        const instance = new sketch.GradientStop();

        assert.equal('{"_class":"gradientStop","position":0,"color":{"_class":"color","red":0,"green":0,"blue":0,"alpha":1}}', JSON.stringify(instance));
    });

    it('Create instances', function () {
        const instance = new sketch.GradientStop({position: 0.5, color: {red: 0.5}});

        assert.equal('{"_class":"gradientStop","position":0.5,"color":{"_class":"color","red":0.5,"green":0,"blue":0,"alpha":1}}', JSON.stringify(instance));
    });
});

describe('Gradient', function () {
    it('Create empty instances', function () {
        const instance = new sketch.Gradient();

        assert.equal('{"_class":"gradient","elipseLength":0,"from":"{0, 0}","to":"{1, 1}","gradientType":1,"shouldSmoothenOpacity":false,"stops":[]}', JSON.stringify(instance));
    });

    it('Create instances', function () {
        const instance = new sketch.GradientStop({gradientType: 2, stops: [{position: 0.5}]});

        assert.equal('{"_class":"gradientStop","position":0,"gradientType":2,"stops":[{"position":0.5}],"color":{"_class":"color","red":0,"green":0,"blue":0,"alpha":1}}', JSON.stringify(instance));
    });
});

describe('Oval', function () {
    it('Create empty instances', function () {
        const instance = new sketch.Oval();

        assert.equal('{"_class":"oval","do_objectID":null,"isFlippedHorizontal":false,"isFlippedVertical":false,"isLocked":false,"isVisible":true,"layerListExpandedType":0,"name":"Path","nameIsFixed":false,"resizingConstraint":63,"resizingType":0,"rotation":0,"shouldBreakMaskChain":false,"booleanOperation":-1,"edited":false,"exportOptions":{"_class":"exportOptions","exportFormats":[],"includedLayerIds":[],"layerOptions":0,"shouldTrim":false},"frame":{"_class":"rect","constrainProportions":false,"x":0,"y":0,"width":0,"height":0},"path":{"_class":"path","isClosed":true,"pointRadiusBehaviour":1,"points":[]}}', JSON.stringify(instance));
    });

    it('Create instances', function () {
        const instance = new sketch.Oval({frame: {width: 500, height: 500}});

        assert.equal('{"_class":"oval","do_objectID":null,"isFlippedHorizontal":false,"isFlippedVertical":false,"isLocked":false,"isVisible":true,"layerListExpandedType":0,"name":"Path","nameIsFixed":false,"resizingConstraint":63,"resizingType":0,"rotation":0,"shouldBreakMaskChain":false,"booleanOperation":-1,"edited":false,"frame":{"_class":"rect","constrainProportions":false,"x":0,"y":0,"width":500,"height":500},"exportOptions":{"_class":"exportOptions","exportFormats":[],"includedLayerIds":[],"layerOptions":0,"shouldTrim":false},"path":{"_class":"path","isClosed":true,"pointRadiusBehaviour":1,"points":[]}}', JSON.stringify(instance));
    });
});

describe('Rectangle', function () {
    it('Create empty instances', function () {
        const instance = new sketch.Rectangle();

        assert.equal('{"_class":"rectangle","do_objectID":null,"isFlippedHorizontal":false,"isFlippedVertical":false,"isLocked":false,"isVisible":true,"layerListExpandedType":0,"name":"Path","nameIsFixed":false,"resizingConstraint":63,"resizingType":0,"rotation":0,"shouldBreakMaskChain":false,"booleanOperation":-1,"edited":false,"fixedRadius":0,"hasConvertedToNewRoundCorners":true,"exportOptions":{"_class":"exportOptions","exportFormats":[],"includedLayerIds":[],"layerOptions":0,"shouldTrim":false},"frame":{"_class":"rect","constrainProportions":false,"x":0,"y":0,"width":0,"height":0},"path":{"_class":"path","isClosed":true,"pointRadiusBehaviour":1,"points":[]}}', JSON.stringify(instance));
    });

    it('Create instances', function () {
        const instance = new sketch.Rectangle({frame: {width: 500, height: 500}});

        assert.equal('{"_class":"rectangle","do_objectID":null,"isFlippedHorizontal":false,"isFlippedVertical":false,"isLocked":false,"isVisible":true,"layerListExpandedType":0,"name":"Path","nameIsFixed":false,"resizingConstraint":63,"resizingType":0,"rotation":0,"shouldBreakMaskChain":false,"booleanOperation":-1,"edited":false,"fixedRadius":0,"hasConvertedToNewRoundCorners":true,"frame":{"_class":"rect","constrainProportions":false,"x":0,"y":0,"width":500,"height":500},"exportOptions":{"_class":"exportOptions","exportFormats":[],"includedLayerIds":[],"layerOptions":0,"shouldTrim":false},"path":{"_class":"path","isClosed":true,"pointRadiusBehaviour":1,"points":[]}}', JSON.stringify(instance));
    });
});

describe('Star', function () {
    it('Create empty instances', function () {
        const instance = new sketch.Star();

        assert.equal('{"_class":"star","do_objectID":null,"isFlippedHorizontal":false,"isFlippedVertical":false,"isLocked":false,"isVisible":true,"layerListExpandedType":0,"name":"Path","nameIsFixed":false,"resizingConstraint":63,"resizingType":0,"rotation":0,"shouldBreakMaskChain":false,"booleanOperation":-1,"edited":false,"numberOfPoints":5,"radius":0.5,"exportOptions":{"_class":"exportOptions","exportFormats":[],"includedLayerIds":[],"layerOptions":0,"shouldTrim":false},"frame":{"_class":"rect","constrainProportions":false,"x":0,"y":0,"width":0,"height":0},"path":{"_class":"path","isClosed":true,"pointRadiusBehaviour":1,"points":[]}}', JSON.stringify(instance));
    });

    it('Create instances', function () {
        const instance = new sketch.Star({frame: {width: 500, height: 500}});

        assert.equal('{"_class":"star","do_objectID":null,"isFlippedHorizontal":false,"isFlippedVertical":false,"isLocked":false,"isVisible":true,"layerListExpandedType":0,"name":"Path","nameIsFixed":false,"resizingConstraint":63,"resizingType":0,"rotation":0,"shouldBreakMaskChain":false,"booleanOperation":-1,"edited":false,"numberOfPoints":5,"radius":0.5,"frame":{"_class":"rect","constrainProportions":false,"x":0,"y":0,"width":500,"height":500},"exportOptions":{"_class":"exportOptions","exportFormats":[],"includedLayerIds":[],"layerOptions":0,"shouldTrim":false},"path":{"_class":"path","isClosed":true,"pointRadiusBehaviour":1,"points":[]}}', JSON.stringify(instance));
    });
});

describe('Polygon', function () {
    it('Create empty instances', function () {
        const instance = new sketch.Polygon();

        assert.equal('{"_class":"polygon","do_objectID":null,"isFlippedHorizontal":false,"isFlippedVertical":false,"isLocked":false,"isVisible":true,"layerListExpandedType":0,"name":"Path","nameIsFixed":false,"resizingConstraint":63,"resizingType":0,"rotation":0,"shouldBreakMaskChain":false,"booleanOperation":-1,"edited":false,"numberOfPoints":5,"exportOptions":{"_class":"exportOptions","exportFormats":[],"includedLayerIds":[],"layerOptions":0,"shouldTrim":false},"frame":{"_class":"rect","constrainProportions":false,"x":0,"y":0,"width":0,"height":0},"path":{"_class":"path","isClosed":true,"pointRadiusBehaviour":1,"points":[]}}', JSON.stringify(instance));
    });

    it('Create instances', function () {
        const instance = new sketch.Polygon({frame: {width: 500, height: 500}});

        assert.equal('{"_class":"polygon","do_objectID":null,"isFlippedHorizontal":false,"isFlippedVertical":false,"isLocked":false,"isVisible":true,"layerListExpandedType":0,"name":"Path","nameIsFixed":false,"resizingConstraint":63,"resizingType":0,"rotation":0,"shouldBreakMaskChain":false,"booleanOperation":-1,"edited":false,"numberOfPoints":5,"frame":{"_class":"rect","constrainProportions":false,"x":0,"y":0,"width":500,"height":500},"exportOptions":{"_class":"exportOptions","exportFormats":[],"includedLayerIds":[],"layerOptions":0,"shouldTrim":false},"path":{"_class":"path","isClosed":true,"pointRadiusBehaviour":1,"points":[]}}', JSON.stringify(instance));
    });
});

describe('Triangle', function () {
    it('Create empty instances', function () {
        const instance = new sketch.Triangle();

        assert.equal('{"_class":"triangle","do_objectID":null,"isFlippedHorizontal":false,"isFlippedVertical":false,"isLocked":false,"isVisible":true,"layerListExpandedType":0,"name":"Path","nameIsFixed":false,"resizingConstraint":63,"resizingType":0,"rotation":0,"shouldBreakMaskChain":false,"booleanOperation":-1,"edited":false,"isEquilateral":false,"exportOptions":{"_class":"exportOptions","exportFormats":[],"includedLayerIds":[],"layerOptions":0,"shouldTrim":false},"frame":{"_class":"rect","constrainProportions":false,"x":0,"y":0,"width":0,"height":0},"path":{"_class":"path","isClosed":true,"pointRadiusBehaviour":1,"points":[]}}', JSON.stringify(instance));
    });

    it('Create instances', function () {
        const instance = new sketch.Triangle({frame: {width: 500, height: 500}});

        assert.equal('{"_class":"triangle","do_objectID":null,"isFlippedHorizontal":false,"isFlippedVertical":false,"isLocked":false,"isVisible":true,"layerListExpandedType":0,"name":"Path","nameIsFixed":false,"resizingConstraint":63,"resizingType":0,"rotation":0,"shouldBreakMaskChain":false,"booleanOperation":-1,"edited":false,"isEquilateral":false,"frame":{"_class":"rect","constrainProportions":false,"x":0,"y":0,"width":500,"height":500},"exportOptions":{"_class":"exportOptions","exportFormats":[],"includedLayerIds":[],"layerOptions":0,"shouldTrim":false},"path":{"_class":"path","isClosed":true,"pointRadiusBehaviour":1,"points":[]}}', JSON.stringify(instance));
    });
});

describe('TextStyle', function () {
    it('Create empty instances', function () {
        const instance = new sketch.TextStyle();

        assert.equal('{"_class":"textStyle","encodedAttributes":{}}', JSON.stringify(instance));
    });

    it('Create instances', function () {
        const instance = new sketch.TextStyle({encodedAttributes: { NSColor: {_archive: ''}}});

        assert.equal('{"_class":"textStyle","encodedAttributes":{"NSColor":{"_archive":""}}}', JSON.stringify(instance));
    });
});
