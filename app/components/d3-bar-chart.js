import Ember from 'ember';

export default Ember.Component.extend({
  height: 24,
  width: 360,
  tagName: 'svg',
  classNames: ['bar-chart'],
  chartData: [],
  thickness: 1,
  showValues: false,

  didInsertElement(){
    this._super(... arguments);
    var _height = this.get('height');
    var _totalItems = this.get('chartData').length;
    var _itemsHeight = _height * (_totalItems);
    var _totalHeight = _itemsHeight + (_height);

    var xScale = d3.scaleLinear()
      .domain([0, d3.max(this.get('chartData'))])
      .range([0, this.get('width')]);

    var yScale = d3.scaleLinear()
      .domain([_totalItems, 1])
      .range([12, _itemsHeight - 12]);

    var chartCanvas = d3.select(this.$()[0])
      .attr("width", this.get('width') + 24)
      .attr("height", _totalHeight);

    var barChart = chartCanvas
      .selectAll('g')
      .data(this.get('chartData'));

    var bar = barChart.enter().append('g')
      .attr("transform", function (d, i) {
        return "translate(24," + i * _height + ")";
      });

    bar.append("rect")
      .attr("width", xScale)
      .attr("height", this.get('height') * this.get('thickness') - 0.5);

    if (this.get('showValues')) {
      bar.append("text")
        .attr("x", function (d) {
          return xScale(d) - 3;
        })
        .attr("y", this.get('height') / 2)
        .attr("dy", ".30em")
        .text(function (d) {
          return d;
        });
    }

    var xAxis = d3.axisBottom(xScale)
      .tickSize(0)
      .tickPadding(10);

    var yAxis = d3.axisLeft(yScale)
      .tickSize(0)
      .tickPadding(10);

    chartCanvas.append('g')
      .attr("transform", "translate(24," + (_itemsHeight) + ")")
      .call(xAxis);

    chartCanvas.append('g')
      .attr("transform", "translate(24,0)")
      .call(yAxis);
  }
});