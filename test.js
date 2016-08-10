(function () {
    simpleBarChart("#chart").setData([{ label: 'Item 1', x1: 1000, x2: 200, x3: 50, displayx1:"$1,000", displayx2:"$200", displayx3:"$50"}, { label: 'Item 2', x1: 840, x2: 400, x3: 100, displayx1:"$840", displayx2:"$400", displayx3:"$100"}], {showLabel: true, colwidth: 70}).render();
}());