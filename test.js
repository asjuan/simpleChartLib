(function () {
    var chart = document.getElementById("chart");
    var bar = simpleBarChart.setData([{ label: 'Item 1', x1: 1000, x2: 200 }, { label: 'Item 2', x1: 840, x2: 400 }]);
    chart.innerHTML = bar.getParsed();
}());