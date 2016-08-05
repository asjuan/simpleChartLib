describe("simpleChartLib", function () {
  it("should add three elements", function () {
    var bar = simpleBarChart.setData([{ label: 'Item 1', x1: 1000, x2: 200 }, { label: 'Item 2', x1: 840, x2: 400 }]);
    console.log(bar.getParsed());
    expect(bar.getParsed()).not.toBe("");
  });
});