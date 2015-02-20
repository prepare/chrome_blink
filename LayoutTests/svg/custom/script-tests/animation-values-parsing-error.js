description("Tests parsing of values attribute.");

var animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
animate.setAttribute("values", ";;");
animate.setAttribute("values", "300;255;180;30;;");
animate.setAttribute("values", "50%;foo;10%");
animate.setAttribute("values", "50%;;;;10%");
animate.setAttribute("values", "50%;  ;10%");
animate.setAttribute("attributeName", "in");
animate.setAttribute("values", "");

var successfullyParsed = true;
