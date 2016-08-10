#Readme

This component will provide a simple Barchart implementation. No Canvas, just pure HTML and CSS

##Example

Create a DOM element, like a div, to attach the chart. Invoke the library.

Then create a snippet like the following :

```
var array = [{ label: 'Item 1', x1: 1000, x2: 200, x3: 50}, { label: 'Item 2', x1: 840, x2: 400, x3: 100}];
simpleBarChart("#aDiv")
.setData(array, {showLabel: true, colwidth: 70})
.render();
```
Once *render* is invoked, it will show a chart like the one below

![Stacked bar chart](/images/stackedbar.PNG)

The only mandatory property is the label one, names for remaining properties do not matter as long as all of them are consistant accross members of that array, ie, the following is not valid

'var array = [{ label: 'Item 1', x1: 1000, x2: 200}, { label: 'Item 2', x3: 840}];



#Licence

MIT
