var simpleBarChart = (function () {

    "use strict";
    function CustomException(text) {
        this.message = text
    }
    function t(s, d) {
        for (var p in d)
            s = s.replace(new RegExp('{' + p + '}', 'g'), d[p]);
        return s;
    }
    function indexIt(array) {
        var list = [];
        var values = [];
        var index;
        var element;
        var key;
        var valueId = 0;
        var object = array[0];
        var data;
        for (index = 0; index < array.length; index++) {

            element = array[index];
            element._id = index + 1;
            data = [];
            valueId = 0;
            for (key in element) {
                if (key !== "label" && key !== "_id") {
                    valueId += 1;
                    data.push({ category: t("Category{pos}", { pos: valueId }), value: element[key] });
                }
            }
            element._data = data;
            list.push(element);
        }
        return list;
    }
    var HEIGHT = 300;
    var COLWIDTH = 50;
    var maxValue = 0;
    var dataSeries = [];
    var isLabelVisible = false;
    var doesArrayHasLabel = function (series) {
        function isvalidFormat(element) {
            return element.hasOwnProperty("label");
        }
        return series.every(isvalidFormat);
    }
    var setMaxValue = function () {
        function acum(curr, next) {
            return {
                value: curr.value + next.value
            };
        }
        dataSeries.forEach(function (element) {
            var sum = element._data.reduce(acum).value;
            if (sum > maxValue) {
                maxValue = sum;
            }
        }, this);
    }
    var parseCols = function () {

        function scale(value) {
            return Math.ceil(value * HEIGHT / maxValue);
        }
        function parseStack(object) {
            var html = "";
            var index;
            var item;
            for (index = 0; index < object._data.length; index++) {
                item = object._data[index];
                html += t("<div title='{label}' class='{category}' style='height:{calculatedHeight}px; width:{defaultWidth}px;' rel='tooltip'></div>", { label: object.label, category: item.category, calculatedHeight: scale(item.value), defaultWidth: COLWIDTH });
            }
            return html;
        }
        var innerHtml = "";
        var iterateCols = function (element) {
            innerHtml += t("<td class='simplechartcol'>{stack}</td>", { stack: parseStack(element) });
        };
        dataSeries.forEach(iterateCols);
        return innerHtml;
    }
    var parseLabels = function () {
        var innerHtml = "";
        var iterateCols = function (element) {
            innerHtml += t("<td class='simplechartcol'><div class='simplechartlabels'>{label}</div></td>", element);
        };
        dataSeries.forEach(iterateCols);
        return innerHtml;
    };
    var parseData = function () {
        var innerHtml = "";
        if (isLabelVisible) {
            innerHtml = t("<table><tr>{cols}</tr><tr>{labels}</tr></table>", { cols: parseCols(), labels: parseLabels() });
        } else {
            innerHtml = t("<table><tr>{cols}</tr></table>", { cols: parseCols() });
        }
        return innerHtml;
    }
    var myAPI;
    return function (elementId) {
        var domNode;
        if (elementId[0] == "#") {
            domNode = document.getElementById(elementId.replace("#",""));
        }
        else {
            throw "This version only supports ids.";
        }

        myAPI = {
            setData: function (series, options) {
                if (!Array.isArray(series)) {
                    throw new CustomException("Invalid data series. An array is expected");
                }
                if (series.length > 0 && !doesArrayHasLabel(series)) {
                    throw new CustomException("An object in this series does not contain mandatory label property");
                }
                dataSeries = indexIt(series);
                setMaxValue();
                if (options) {
                    if (options.showLabel) {
                        isLabelVisible = true;
                    }
                    if (options.colwidth) {
                        COLWIDTH = options.colwidth;
                    }
                }
                return myAPI;
            },
            render: function () {
                domNode.innerHTML = parseData();
            }
        }
        return myAPI;
    };
} ());