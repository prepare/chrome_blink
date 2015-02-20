description("Tests whether removing the viewBox attribute propagates to the viewBox DOM values.");

var svgDoc = document.implementation.createDocument("http://www.w3.org/2000/svg", "svg", null);
var svg = svgDoc.rootElement;

svg.setAttribute("viewBox", "20 10 200 100");
shouldBe("svg.viewBox.baseVal.x", "20");
shouldBe("svg.viewBox.baseVal.y", "10");
shouldBe("svg.viewBox.baseVal.width", "200");
shouldBe("svg.viewBox.baseVal.height", "100");
svg.removeAttribute("viewBox");
shouldBe("svg.viewBox.baseVal.x", "0");
shouldBe("svg.viewBox.baseVal.y", "0");
shouldBe("svg.viewBox.baseVal.width", "0");
shouldBe("svg.viewBox.baseVal.height", "0");

svg.setAttribute("viewBox", "20 10 200 100");
shouldBe("svg.viewBox.baseVal.x", "20");
shouldBe("svg.viewBox.baseVal.y", "10");
shouldBe("svg.viewBox.baseVal.width", "200");
shouldBe("svg.viewBox.baseVal.height", "100");
svg.setAttribute("viewBox", "invalid value");
shouldBe("svg.viewBox.baseVal.x", "0");
shouldBe("svg.viewBox.baseVal.y", "0");
shouldBe("svg.viewBox.baseVal.width", "0");
shouldBe("svg.viewBox.baseVal.height", "0");
shouldBe("svg.getAttribute('viewBox')", "'invalid value'");

var successfullyParsed = true;
