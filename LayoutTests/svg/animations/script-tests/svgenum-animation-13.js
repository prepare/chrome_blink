description("Test ChannelSelectorType enumeration animations");
createSVGTestCase();

// Setup test document
var defsElement = createSVGElement("defs");
rootSVGElement.appendChild(defsElement);

var feImage1 = createSVGElement("feImage");
feImage1.setAttribute("result", "Map");
feImage1.setAttributeNS(xlinkNS, "xlink:href", "../W3C-SVG-1.1/resources/sphere.png");

var feImage2 = createSVGElement("feImage");
feImage2.setAttribute("result", "Texture");
feImage2.setAttributeNS(xlinkNS, "xlink:href", "../W3C-SVG-1.1/resources/DisplaceChecker.png");

var displacementMap = createSVGElement("feDisplacementMap");
displacementMap.setAttribute("in", "Texture");
displacementMap.setAttribute("in2", "Map");
displacementMap.setAttribute("scale", "64");
displacementMap.setAttribute("xChannelSelector", "B");
displacementMap.setAttribute("yChannelSelector", "G");

var filter = createSVGElement("filter");
filter.setAttribute("id", "filter");
filter.setAttribute("filterUnit", "objectBoundingBox");
filter.setAttribute("x", "0");
filter.setAttribute("y", "0");
filter.setAttribute("width", "1");
filter.setAttribute("height", "1");
filter.appendChild(feImage1);
filter.appendChild(feImage2);
filter.appendChild(displacementMap);
defsElement.appendChild(filter);

var rect = createSVGElement("rect");
rect.setAttribute("id", "rect");
rect.setAttribute("onclick", "executeTest()");
rect.setAttribute("width", "100");
rect.setAttribute("height", "100");
rect.setAttribute("filter", "url(#filter)");
rootSVGElement.appendChild(rect);

var animate1 = createSVGElement("animate");
animate1.setAttribute("id", "animation");
animate1.setAttribute("attributeName", "xChannelSelector");
animate1.setAttribute("begin", "rect.click");
animate1.setAttribute("dur", "4s");
animate1.setAttribute("values", "R;G;B;A");
animate1.setAttribute("fill", "freeze");
displacementMap.appendChild(animate1);

// Setup animation test
function sample1() {
    shouldBe("displacementMap.xChannelSelector.animVal", "SVGFEDisplacementMapElement.SVG_CHANNEL_B");
    shouldBe("displacementMap.xChannelSelector.baseVal", "SVGFEDisplacementMapElement.SVG_CHANNEL_B");
}

function sample2() {
    shouldBe("displacementMap.xChannelSelector.animVal", "SVGFEDisplacementMapElement.SVG_CHANNEL_R");
    shouldBe("displacementMap.xChannelSelector.baseVal", "SVGFEDisplacementMapElement.SVG_CHANNEL_B");
}

function sample3() {
    shouldBe("displacementMap.xChannelSelector.animVal", "SVGFEDisplacementMapElement.SVG_CHANNEL_G");
    shouldBe("displacementMap.xChannelSelector.baseVal", "SVGFEDisplacementMapElement.SVG_CHANNEL_B");
}

function sample4() {
    shouldBe("displacementMap.xChannelSelector.animVal", "SVGFEDisplacementMapElement.SVG_CHANNEL_A");
    shouldBe("displacementMap.xChannelSelector.baseVal", "SVGFEDisplacementMapElement.SVG_CHANNEL_B");
}

function executeTest() {
    const expectedValues = [
        // [animationId, time, sampleCallback]
        ["animation", 0.0,   sample1],
        ["animation", 0.001, sample2],
        ["animation", 0.999, sample2],
        ["animation", 1.001, sample3],
        ["animation", 1.999, sample3],
        ["animation", 2.001, sample1],
        ["animation", 2.999, sample1],
        ["animation", 3.001, sample4],
        ["animation", 3.999, sample4],
        ["animation", 4.001, sample4]
    ];

    runAnimationTest(expectedValues);
}

var successfullyParsed = true;
