description("Test calcMode=discrete animation on SVGAnimateTransform.");
createSVGTestCase();

// Setup test document
var rect = createSVGElement("rect");
rect.setAttribute("id", "rect");
rect.setAttribute("width", "100");
rect.setAttribute("height", "100");
rect.setAttribute("x", "0");
rect.setAttribute("y", "0");
rect.setAttribute("fill", "green");
rect.setAttribute("onclick", "executeTest()");

var animate = createSVGElement("animateTransform");
animate.setAttribute("id", "animation");
animate.setAttribute("attributeName", "transform");
animate.setAttribute("type", "translate");
animate.setAttribute("from", "100,100");
animate.setAttribute("to", "0,0");
animate.setAttribute("type", "translate");
animate.setAttribute("calcMode", "discrete");
animate.setAttribute("begin", "click");
animate.setAttribute("dur", "4s");
rect.appendChild(animate);
rootSVGElement.appendChild(rect);

// Setup animation test
function sample1() {
    // Check initial/end conditions
    shouldBe("rect.transform.animVal.numberOfItems", "1");
    shouldBe("rect.transform.animVal.getItem(0).type", "SVGTransform.SVG_TRANSFORM_TRANSLATE");
    shouldBeCloseEnough("rect.transform.animVal.getItem(0).matrix.e", "100");
    shouldBeCloseEnough("rect.transform.animVal.getItem(0).matrix.f", "100");
    shouldBe("rect.transform.baseVal.numberOfItems", "0");
}

function sample2() {
    shouldBe("rect.transform.animVal.numberOfItems", "1");
    shouldBe("rect.transform.animVal.getItem(0).type", "SVGTransform.SVG_TRANSFORM_TRANSLATE");
    shouldBeCloseEnough("rect.transform.animVal.getItem(0).matrix.e", "0");
    shouldBeCloseEnough("rect.transform.animVal.getItem(0).matrix.f", "0");
    shouldBe("rect.transform.baseVal.numberOfItems", "0");
}

function sample3() {
    shouldBe("rect.transform.animVal.numberOfItems", "0");
    shouldBe("rect.transform.baseVal.numberOfItems", "0");
}

function executeTest() {
    const expectedValues = [
        // [animationId, time, sampleCallback]
        ["animation", 0.001, sample1],
        ["animation", 1.999, sample1],
        ["animation", 2.001, sample2],
        ["animation", 3.999, sample2],
        ["animation", 4.001, sample3]
    ];

    runAnimationTest(expectedValues);
}

var successfullyParsed = true;
