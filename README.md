#Readme

This component will provide a simple Barchart implementation. No Canvas, just pure HTML and CSS

##Example

Create a DOM element, like a div, to attach the chart.

Once the library is referenced. Place a snippet like:

```
var array = [{ label: 'Item 1', x1: 1000, x2: 200, x3: 50}, { label: 'Item 2', x1: 840, x2: 400, x3: 100}];
simpleBarChart("#aDiv")
.setData(array, {showLabel: true, colwidth: 70})
.render();
```
Once *render* is invoked, it will show a chart like the one below

![Stacked bar chart](/images/stackedbar.PNG)

The only mandatory property is the label one, names for remaining properties do not matter as long as all of them are consistant accross members of that array, ie, the following is not valid

```
var array = [{ label: 'Bar', bar1: 1000, bar2: 200}, { label: 'Foo', foo1: 840, foo2: 30}];
```

#Licence

MIT
