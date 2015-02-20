description("Test behavior on dynamic-update of attributeName");
createSVGTestCase();

// Setup test document
var rect = createSVGElement("rect");
rect.setAttribute("id", "rect");
rect.setAttribute("width", "200");
rect.setAttribute("height", "200");
rect.setAttribute("fill", "red");
rect.setAttribute("color", "red");
rect.setAttribute("onclick", "executeTest()");

var animate = createSVGElement("animate");
animate.setAttribute("id", "animation");
animate.setAttribute("attributeName", "color");
animate.setAttribute("from", "green");
animate.setAttribute("to", "green");
animate.setAttribute("begin", "click");
animate.setAttribute("dur", "3s");
animate.setAttribute("fill", "freeze");
animate.setAttribute("calcMode", "discrete");
rect.appendChild(animate);
rootSVGElement.appendChild(rect);

// Setup animation test
function sample1() {
    expectColor(rect, 255, 0, 0);
    shouldBeEqualToString("rect.style.color", "");
}


function sample2() {
    expectColor(rect, 0, 128, 0);
    shouldBeEqualToString("rect.style.color", "");
}

function sample3() {
    // Set 'attributeName' from 'color' to 'fill'
    animate.setAttribute("attributeName", "fill");
}

function sample4() {
    expectFillColor(rect, 0, 128, 0);
    shouldBeEqualToString("rect.style.color", "");
    shouldBeEqualToString("rect.style.fill", "");
}

function executeTest() {
    const expectedValues = [
        // [animationId, time, sampleCallback]
        ["animation", 0.0,   sample1],
        ["animation", 0.001, sample2],
        ["animation", 1.5,   sample3],
        ["animation", 3.0,   sample4],
    ];

    runAnimationTest(expectedValues);
}

var successfullyParsed = true;
