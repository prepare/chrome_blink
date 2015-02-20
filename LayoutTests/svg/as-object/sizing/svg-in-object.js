// global async_test, assert_equals
//
// This test generates a couple of scenarios (each a TestData) for
// sizing SVG inside an inline <object> and has a simple JavaScript
// sizing implementation that handles the generated scenarios. It
// generates a DOM corresponding to the scenario and compares the laid
// out size to the calculated size.
//
// The tests loops through different combinations of:
//
// * width and height on <object>
//
// * width and height on <svg>
//
// * viewBox on <svg> (gives intrinsic ratio)
//
// * width and height on containing block of <object>
//
// All these contribute to the final size of the SVG in some way.
//
// The test focuses on the size of the CSS box generated by the SVG.
// The SVG is always empty by itself so no actual SVG are tested.
//
// Focus is also put on how the different attributes interact, little
// focus is put on variations within an attribute that doesn't affect
// the relationship to other attributes, i.e only px and % units are
// used since that covers the interactions.
//
// To debug a specific test append ?<test-id> to the URL. An <iframe>
// is generated with equivalent test and the source of the test is
// added to a <pre> element.
//
// Note: placeholder is an alternative name for the tested <object>
// element; 'object' becomes such an ambigious name when placed in
// code.

(function() {
    function parseLength(l) {
        var match = /^([-+]?[0-9]+|[-+]?[0-9]*\.[0-9]+)(px|%)?$/.exec(l);
        if (!match)
            return null;
        return new Length(Number(match[1]), match[2] ? match[2] : "px");
    }

    function parseViewBox(input) {
        if (!input)
            return null;

        var arr = input.split(' ');
        return arr.map(function(a) { return parseInt(a); });
    }

    // Only px and % are used
    function convertToPx(input, percentRef) {
        if (input == null)
            return null;
        var length = parseLength(input);
        if (length.amount == 0)
            return 0;
        if (!length.unit)
            length.unit = "px";
        if (length.unit == "%" && percentRef === undefined)
            return null;
        return length.amount * { px: 1,
                                 "%": percentRef/100}[length.unit];
    }

    function Length(amount, unit) {
        this.amount = amount;
        this.unit = unit;
    }

    function describe(data) {
        function dumpObject(obj) {
            var r = "";
            for (var property in obj) {
                if (obj.hasOwnProperty(property)) {
                    var value = obj[property];
                    if (typeof value == 'string')
                        value = "'" + value + "'";
                    else if (value == null)
                        value = "null";
                    else if (typeof value == 'object')
                    {
                        if (value instanceof Array)
                            value = "[" + value + "]";
                        else
                            value = "{" + dumpObject(value) + "}";
                    }

                    if (value != "null")
                        r += property + ": " + value + ", ";
                }
            }
            return r;
        }
        var result = dumpObject(data);
        if (result == "")
            return "(initial values)";
        return result;
    }

    function TestData(config) {
        this.config = config;
        this.name = describe(config);
        this.style = {};
        this.mapPresentationalHintLength("width", config.placeholderWidthAttr);
        this.mapPresentationalHintLength("height", config.placeholderHeightAttr);
    }

    TestData.prototype.mapPresentationalHintLength =
        function(cssProperty, attr) {
            if (attr) {
                var l = parseLength(attr);
                if (l)
                    this.style[cssProperty] = l.amount + l.unit;
            }
        };

    TestData.prototype.computedWidthIsAuto = function() {
        return !this.style["width"] || this.style["width"] == 'auto';
    };

    TestData.prototype.computedHeightIsAuto = function() {
        return !this.style["height"] || this.style["height"] == 'auto' ||
            (parseLength(this.style["height"]).unit == '%' &&
             this.containerComputedHeightIsAuto());
    };

    TestData.prototype.containerComputedWidthIsAuto = function() {
        return !this.config.containerWidthStyle ||
            this.config.containerWidthStyle == 'auto';
    };

    TestData.prototype.containerComputedHeightIsAuto = function() {
        return !this.config.containerHeightStyle ||
            this.config.containerHeightStyle == 'auto';
    };

    TestData.prototype.intrinsicInformation = function() {
        var w = convertToPx(this.config.svgWidthAttr) || 0;
        var h = convertToPx(this.config.svgHeightAttr) || 0;
        var r = 0;
        if (w && h) {
            r =  w / h;
        } else {
            var vb = parseViewBox(this.config.svgViewBoxAttr);
            if (vb) {
                r = vb[2] / vb[3];
            }
            if (r) {
                if (!w && h)
                    w = h * r;
                else if (!h && w)
                    h = w / r;
            }
        }
        return { width: w, height: h, ratio: r };
    };


    TestData.prototype.computeInlineReplacedSize = function() {
        var intrinsic = this.intrinsicInformation();
        var self = this;

        // http://www.w3.org/TR/CSS2/visudet.html#inline-replaced-height
        function calculateUsedHeight() {
            if (self.computedHeightIsAuto()) {
                if (self.computedWidthIsAuto() && intrinsic.height)
                    return intrinsic.height;
                if (intrinsic.ratio)
                    return calculateUsedWidth() / intrinsic.ratio;
                if (intrinsic.height)
                    return intrinsic.height;
                return 150;
            }

            return convertToPx(self.style["height"],
                               convertToPx(self.config.containerHeightStyle,
                                           self.outerHeight));
        }

        // http://www.w3.org/TR/CSS2/visudet.html#inline-replaced-width
        function calculateUsedWidth() {
            if (self.computedWidthIsAuto()) {
                if (self.computedHeightIsAuto() && intrinsic.width)
                    return intrinsic.width;
                if (!self.computedHeightIsAuto() && intrinsic.ratio)
                    return calculateUsedHeight() * intrinsic.ratio;
                if (self.computedHeightIsAuto() && intrinsic.ratio) {
                    if (self.containerComputedWidthIsAuto()) {
                        // Note: While this is actually undefined in CSS
                        // 2.1, use the suggested value by examining the
                        // ancestor widths.
                        return self.outerWidth;
                    } else {
                        return convertToPx(self.config.containerWidthStyle,
                                           self.outerWidth);
                    }
                }
                if (intrinsic.width)
                    return intrinsic.width;
                return 300;
            }

            if (self.containerComputedWidthIsAuto())
                return convertToPx(self.style["width"], self.outerWidth);
            else
                return convertToPx(self.style["width"],
                                   convertToPx(self.config.containerWidthStyle,
                                               self.outerWidth));
        }
        return { width: calculateUsedWidth(),
                 height: calculateUsedHeight() };
    };

    var testContainer = document.querySelector('#testContainer');
    TestData.prototype.outerWidth = testContainer.getBoundingClientRect().width;
    TestData.prototype.outerHeight = testContainer.getBoundingClientRect().height;

    window.TestData = TestData;
})();

function setupContainer(testData, placeholder, options) {
    options = options || {};

    var container = document.createElement("div");

    container.id = "container";
    if (testData.config.containerWidthStyle)
        container.style.width = testData.config.containerWidthStyle;

    if (testData.config.containerHeightStyle)
        container.style.height = testData.config.containerHeightStyle;

    if (options.pretty)
        container.appendChild(document.createTextNode("\n\t\t"));
    container.appendChild(placeholder);
    if (options.pretty)
        container.appendChild(document.createTextNode("\n\t"));

    return container;
}

function setupPlaceholder(testData, options) {
    options = options || {};

    function generateSVGURI(testData, encoder) {
        var res = '<svg xmlns="http://www.w3.org/2000/svg"';
        function addAttr(attr, prop) {
            if (testData.config[prop])
                res += ' ' + attr + '="' + testData.config[prop] + '"';
        }
        addAttr("width", "svgWidthAttr");
        addAttr("height", "svgHeightAttr");
        addAttr("viewBox", "svgViewBoxAttr");
        res += '></svg>';
        return 'data:image/svg+xml' + encoder(res);
    }

    var placeholder = document.createElement("object");

    if (options.pretty) {
        placeholder.appendChild(document.createTextNode("\n\t\t\t"));
        placeholder.appendChild(
            document.createComment(
                generateSVGURI(testData, function(x) { return "," + x; })));
        placeholder.appendChild(document.createTextNode("\n\t\t"));
    }

    placeholder.setAttribute("id", "test");
    if (testData.config.placeholderWidthAttr)
        placeholder.setAttribute("width", testData.config.placeholderWidthAttr);
    if (testData.config.placeholderHeightAttr)
        placeholder.setAttribute("height", testData.config.placeholderHeightAttr);
    placeholder.setAttribute("data",
                             generateSVGURI(testData, function(x) {
                                 return ";base64," + btoa(x);
                             }));
    return placeholder;
}

function buildDemo(testData) {
    // Non-essential debugging tool

    var options = { pretty: true };
    var expectedRect =
            testData.computeInlineReplacedSize();
    var container =
            setupContainer(testData, setupPlaceholder(testData, options), options);

    var root = document.createElement("html");
    var style = document.createElement("style");

    style.textContent = "\n" +
        "\tbody { margin: 0; font-family: sans-serif }\n" +
        "\t#expected {\n" +
        "\t\twidth: " + (expectedRect.width) + "px; height: "
        + (expectedRect.height) + "px;\n" +
        "\t\tborder: 10px solid lime; position: absolute;\n" +
        "\t\tbackground-color: red }\n" +
        "\t#testContainer { position: absolute;\n" +
        "\t\ttop: 10px; left: 10px; width: 800px; height: 600px }\n" +
        "\tobject { background-color: green }\n" +
        "\t.result { position: absolute; top: 0; right: 0;\n" +
        "\t\tbackground-color: hsla(0,0%, 0%, 0.85); border-radius: 0.5em;\n" +
        "\t\tpadding: 0.5em; border: 0.25em solid black }\n" +
        "\t.pass { color: lime }\n" +
        "\t.fail { color: red }\n";

    root.appendChild(document.createTextNode("\n"));
    root.appendChild(style);
    root.appendChild(document.createTextNode("\n"));

    var script = document.createElement("script");
    script.textContent = "\n" +
        "onload = function() {\n" +
        "\tvar objectRect = \n" +
        "\t\tdocument.querySelector('#test').getBoundingClientRect();\n" +
        "\tpassed = (objectRect.width == " + expectedRect.width + " && " +
        "objectRect.height == " + expectedRect.height + ");\n" +
        "\tdocument.body.insertAdjacentHTML('beforeEnd',\n" +
        "\t\t'<span class=\"result '+ (passed ? 'pass' : 'fail') " +
        "+ '\">' + (passed ? 'Pass' : 'Fail') + '</span>');\n" +
        "};\n";

    root.appendChild(script);
    root.appendChild(document.createTextNode("\n"));

    var expectedElement = document.createElement("div");
    expectedElement.id = "expected";
    root.appendChild(expectedElement);
    root.appendChild(document.createTextNode("\n"));

    var testContainer = document.createElement("div");
    testContainer.id = "testContainer";
    testContainer.appendChild(document.createTextNode("\n\t"));
    testContainer.appendChild(container);
    testContainer.appendChild(document.createTextNode("\n"));
    root.appendChild(testContainer);
    root.appendChild(document.createTextNode("\n"));

    return "<!DOCTYPE html>\n" + root.outerHTML;
}

function doCombinationTest(values, func)
{
    // Recursively construct all possible combinations of values and
    // send them to |func|. Example:
    //
    // values: [["X", ["a", "b"]],
    //          ["Y", ["c", "d"]]]
    //
    // generates the objects:
    //
    // 1: { "X": "a", "Y": "c" }
    // 2: { "X": "a", "Y": "d" }
    // 3: { "X": "b", "Y": "c" }
    // 4: { "X": "b", "Y": "d" }
    //
    // and each will be sent to |func| with the corresponding prefixed
    // id (modulo order).

    var combinationId = 1;
    function doCombinationTestRecursive(slicedValues, config) {
        if (slicedValues.length > 0) {
            var configKey = slicedValues[0][0];
            slicedValues[0][1].forEach(function(configValue) {
                var new_config = {};
                for (k in config)
                    new_config[k] = config[k];
                new_config[configKey] = configValue;
                doCombinationTestRecursive(slicedValues.slice(1), new_config);
            });
        } else {
            func(config, combinationId++);
        }
    }
    doCombinationTestRecursive(values, {});
}

var debugHint = function(id) { return "(append ?"+id+" to debug) " };
var testSingleId;
if (window.location.search) {
    testSingleId = window.location.search.substring(1);
    debugHint = function(id) { return ""; };
}

function testSVGInObjectWithPlaceholderHeightAttr(placeholderHeightAttr) {
    // Separated over placeholderHeightAttr so that the test count is around ~200

    doCombinationTest(
        [["containerWidthStyle", [null, "400px"]],
         ["containerHeightStyle", [null, "400px"]],
         ["placeholderWidthAttr", [null, "100", "50%"]],
         ["placeholderHeightAttr", [placeholderHeightAttr]],
         ["svgViewBoxAttr", [ null, "0 0 100 200" ]],
         ["svgWidthAttr", [ null, "200", "25%" ]],
         ["svgHeightAttr", [ null, "200", "25%" ]]],
        function(config, id) {
            if (!testSingleId || testSingleId == id) {
                var testData = new TestData(config);
                var t = async_test(testData.name);

                var expectedRect =
                        testData.computeInlineReplacedSize();
                var placeholder = setupPlaceholder(testData);
                var container =
                        setupContainer(testData, placeholder);

                var checkSize = function() {
                    var placeholderRect =
                            placeholder.getBoundingClientRect();

                    try {
                        assert_equals(placeholderRect.width,
                                      expectedRect.width,
                                      debugHint(id) + "Wrong width");
                        assert_equals(placeholderRect.height,
                                      expectedRect.height,
                                      debugHint(id) + "Wrong height");
                    } finally {
                        testContainer.removeChild(container);
                        if (testSingleId)
                            document.body.removeChild(testContainer);
                    }
                    t.done();
                };

                t.step(function() {
                    placeholder.addEventListener('load', function() {
                        // setTimeout is a work-around to let engines
                        // finish layout of child browsing contexts even
                        // after the load event
                        setTimeout(t.step_func(checkSize), 0);
                    });
                    testContainer.appendChild(container);
                });
            }

            if (testSingleId == id) {
                var pad = function(n, width, z) {
                    z = z || '0';
                    n = n + '';
                    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
                };

                var demo = buildDemo(testData);
                var iframe = document.createElement('iframe');
                iframe.style.width = (Math.max(900, expectedRect.width)) + "px";
                iframe.style.height = (Math.max(400, expectedRect.height)) + "px";
                iframe.src = "data:text/html;charset=utf-8," + encodeURIComponent(demo);
                document.body.appendChild(iframe);

                document.body.insertAdjacentHTML(
                    'beforeEnd',
                    '<p><a href="data:application/octet-stream;charset=utf-8;base64,' +
                        btoa(demo) + '" download="svg-in-object-test-' + pad(id, 3) + '.html">Download</a></p>');
            }
        });
}
