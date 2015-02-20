description("This test checks the currentColor value on the color property");

// Setup a real SVG document, as we want to access CSS style information.
var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svgElement.setAttribute("width", "150");
svgElement.setAttribute("height", "50");

var gElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
gElement.setAttribute("style", "color: green");
svgElement.appendChild(gElement);

var rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
rectElement.setAttribute("color", "currentColor");
rectElement.setAttribute("fill", "currentColor");
gElement.appendChild(rectElement);

document.getElementById("description").appendChild(svgElement);

shouldBeEqualToString("getComputedStyle(rectElement).color", "rgb(0, 128, 0)");

successfullyParsed = true;
