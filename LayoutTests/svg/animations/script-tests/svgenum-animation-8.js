description("Test ComponentTransferType enumeration animations");
createSVGTestCase();

// Setup test document
var feRFunc = createSVGElement("feFuncR");
feRFunc.setAttribute("type", "identity");
feRFunc.setAttribute("amplitude", "10");

var feGFunc = createSVGElement("feFuncG");
feGFunc.setAttribute("type", "identity");
feGFunc.setAttribute("amplitude", "10");

var feBFunc = createSVGElement("feFuncB");
feBFunc.setAttribute("type", "identity");
feBFunc.setAttribute("amplitude", "110");

var feAFunc = createSVGElement("feFuncA");
feAFunc.setAttribute("type", "identity");
feAFunc.setAttribute("amplitude", "110");

var feComponentTransfer = createSVGElement("feComponentTransfer");
feComponentTransfer.appendChild(feRFunc);
feComponentTransfer.appendChild(feGFunc);
feComponentTransfer.appendChild(feBFunc);
feComponentTransfer.appendChild(feAFunc);

var filter = createSVGElement("filter");
filter.setAttribute("id", "filter");
filter.setAttribute("filterUnits", "objectBoundingBox");
filter.setAttribute("x", "0%");
filter.setAttribute("y", "0%");
filter.setAttribute("width", "100%");
filter.setAttribute("height", "100%");
filter.appendChild(feComponentTransfer);

var defs = createSVGElement("defs");
defs.appendChild(filter);
rootSVGElement.appendChild(defs);

var rect = createSVGElement("rect");
rect.setAttribute("id", "rect");
rect.setAttribute("width", "100");
rect.setAttribute("height", "100");
rect.setAttribute("fill", "#408067");
rect.setAttribute("filter", "url(#filter)");
rect.setAttribute("onclick", "executeTest()");
rootSVGElement.appendChild(rect);

var animate = createSVGElement("animate");
animate.setAttribute("id", "animation");
animate.setAttribute("attributeName", "type");
animate.setAttribute("begin", "rect.click");
animate.setAttribute("dur", "5s");
animate.setAttribute("values", "identity;table;discrete;linear;gamma");
feRFunc.appendChild(animate);

// Setup animation test
function sample1() {
    shouldBe("feRFunc.type.animVal", "SVGComponentTransferFunctionElement.SVG_FECOMPONENTTRANSFER_TYPE_IDENTITY");
    shouldBe("feRFunc.type.baseVal", "SVGComponentTransferFunctionElement.SVG_FECOMPONENTTRANSFER_TYPE_IDENTITY");
}

function sample2() {
    shouldBe("feRFunc.type.animVal", "SVGComponentTransferFunctionElement.SVG_FECOMPONENTTRANSFER_TYPE_TABLE");
    shouldBe("feRFunc.type.baseVal", "SVGComponentTransferFunctionElement.SVG_FECOMPONENTTRANSFER_TYPE_IDENTITY");
}

function sample3() {
    shouldBe("feRFunc.type.animVal", "SVGComponentTransferFunctionElement.SVG_FECOMPONENTTRANSFER_TYPE_DISCRETE");
    shouldBe("feRFunc.type.baseVal", "SVGComponentTransferFunctionElement.SVG_FECOMPONENTTRANSFER_TYPE_IDENTITY");
}

function sample4() {
    shouldBe("feRFunc.type.animVal", "SVGComponentTransferFunctionElement.SVG_FECOMPONENTTRANSFER_TYPE_LINEAR");
    shouldBe("feRFunc.type.baseVal", "SVGComponentTransferFunctionElement.SVG_FECOMPONENTTRANSFER_TYPE_IDENTITY");
}

function sample5() {
    shouldBe("feRFunc.type.animVal", "SVGComponentTransferFunctionElement.SVG_FECOMPONENTTRANSFER_TYPE_GAMMA");
    shouldBe("feRFunc.type.baseVal", "SVGComponentTransferFunctionElement.SVG_FECOMPONENTTRANSFER_TYPE_IDENTITY");
}

function executeTest() {
    const expectedValues = [
        // [animationId, time, sampleCallback]
        ["animation", 0.0,   sample1],
        ["animation", 0.999, sample1],
        ["animation", 1.001, sample2],
        ["animation", 1.999, sample2],
        ["animation", 2.001, sample3],
        ["animation", 2.999, sample3],
        ["animation", 3.001, sample4],
        ["animation", 3.999, sample4],
        ["animation", 4.001, sample5],
        ["animation", 4.999, sample5],
        ["animation", 5.001, sample1]
    ];

    runAnimationTest(expectedValues);
}

var successfullyParsed = true;
