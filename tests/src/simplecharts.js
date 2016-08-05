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
                if (key !== "label") {
                    valueId += 1;
                    data.push({ category: t("Category{pos}", { pos: valueId }), value: element[key] });
                }
            }
            element.data = data;
            list.push(element);
        }
        return list;
    }
    var HEIGHT = 300;
    var maxValue = 0;
    var dataSeries = [];
    var doesArrayHasLabel = function (series) {
        function isvalidFormat(element) {
            return element.hasOwnProperty("label");
        }
        return series.every(isvalidFormat);
    }
    var setMaxValue = function () {
        function acum(curr, next) {
            return curr.value + next.value;
        }
        dataSeries.forEach(function (element) {
            var sum = element.data.reduce(acum);
            if (sum > maxValue) {
                maxValue = sum;
            }
        }, this);
    }
    var parseCols = function () {

        function scale(value) {
            return value * HEIGHT / maxValue;
        }
        function parseStack(object) {
            var html = "";
            var index;
            var item;
            for (index = 0; index < object.data.length; index++) {
                item = object.data[index];
                html += t("<div title='{label}' class='{category}' style='height:{calculatedHeight}' rel='tooltip'></div>", { label: object.label, category: item.category, calculatedHeight: scale(object.value) });
            }
        }
        var innerHtml = "";
        var iterateCols = function (element) {
            innerHtml += t("<td>{stack}</td>", { stack: parseStack(element) });
        };
        dataSeries.forEach(iterateCols);
        return innerHtml;
    }
    var parseData = function () {
        var innerHtml = t("<table><tr>{cols}</tr></table>", { cols: parseCols() });
        return innerHtml;
    }
    var myAPI = {
        setData: function (series) {
            if (!Array.isArray(series)) {
                throw new CustomException("Invalid data series. An array is expected");
            }
            if (series.length > 0 && !doesArrayHasLabel(series)) {
                throw new CustomException("An object in this series does not contain mandatory label property");
            }
            dataSeries = indexIt(series);
            setMaxValue();
            return myAPI;
        },
        getParsed: parseData
    };

    return myAPI;
} ());