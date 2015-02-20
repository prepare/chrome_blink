// [Name] SVGFEComponentTransferElement-dom-type-attr.js
// [Expected rendering result] An image with feComponentTransfer filter - and a series of PASS messages

description("Tests dynamic updates of the 'type' attribute of the SVGFEComponentTransferElement object")
createSVGTestCase();

var feRFunc = createSVGElement("feFuncR");
feRFunc.setAttribute("type", "gamma");
feRFunc.setAttribute("amplitude", "10");

var feGFunc = createSVGElement("feFuncG");
feGFunc.setAttribute("type", "gamma");
feGFunc.setAttribute("amplitude", "10");

var feBFunc = createSVGElement("feFuncB");
feBFunc.setAttribute("type", "gamma");
feBFunc.setAttribute("amplitude", "110");

var feAFunc = createSVGElement("feFuncA");
feAFunc.setAttribute("type", "gamma");
feAFunc.setAttribute("amplitude", "110");

var feCompnentTransferElement = createSVGElement("feComponentTransfer");
feCompnentTransferElement.appendChild(feRFunc);
feCompnentTransferElement.appendChild(feGFunc);
feCompnentTransferElement.appendChild(feBFunc);
feCompnentTransferElement.appendChild(feAFunc);

var compTranFilter = createSVGElement("filter");
compTranFilter.setAttribute("id", "compTranFilter");
compTranFilter.setAttribute("filterUnits", "objectBoundingBox");
compTranFilter.setAttribute("x", "0%");
compTranFilter.setAttribute("y", "0%");
compTranFilter.setAttribute("width", "100%");
compTranFilter.setAttribute("height", "100%");
compTranFilter.appendChild(feCompnentTransferElement);

var defsElement = createSVGElement("defs");
defsElement.appendChild(compTranFilter);
rootSVGElement.appendChild(defsElement);

var imageElement = createSVGElement("image");
imageElement.setAttributeNS(xlinkNS, "xlink:href", "../W3C-SVG-1.1/resources/struct-image-01.png");
imageElement.setAttribute("width", "400");
imageElement.setAttribute("height", "200");
imageElement.setAttribute("preserveAspectRatio", "none");
imageElement.setAttribute("filter", "url(#compTranFilter)");
rootSVGElement.appendChild(imageElement);

rootSVGElement.setAttribute("width", "400");
rootSVGElement.setAttribute("height", "200");

shouldBeEqualToString("feRFunc.getAttribute('type')", "gamma");
shouldBeEqualToString("feGFunc.getAttribute('type')", "gamma");
shouldBeEqualToString("feBFunc.getAttribute('type')", "gamma");
shouldBeEqualToString("feAFunc.getAttribute('type')", "gamma");

function repaintTest() {
    feRFunc.setAttribute("type", "linear");
    feGFunc.setAttribute("type", "linear");
    feBFunc.setAttribute("type", "linear");
    feAFunc.setAttribute("type", "linear");

    shouldBeEqualToString("feRFunc.getAttribute('type')", "linear");
    shouldBeEqualToString("feGFunc.getAttribute('type')", "linear");
    shouldBeEqualToString("feBFunc.getAttribute('type')", "linear");
    shouldBeEqualToString("feAFunc.getAttribute('type')", "linear");
}

var successfullyParsed = true;
