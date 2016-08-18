import Ember from 'ember';

export default Ember.Component.extend({
  height: 25,
  width: 360,
  tagName: 'svg',
  classNames: ['bar-chart'],

  didInsertElement(){
    this._super(... arguments);
    var _height = this.get('height');
    var x = d3.scaleLinear()
      .domain([0, d3.max(this.get('chartData'))])
      .range([0, this.get('width')]);

    var chartCanvas = d3.select(this.$()[0])
      .attr("width", this.get('width'))
      .attr("height", this.get('height') * this.get('chartData').length);

    var barChart = chartCanvas
      .selectAll('g')
      .data(this.get('chartData'));

    var bar = barChart.enter().append('g')
      .attr("transform", function (d, i) {
        return "translate(0," + i * _height + ")";
      });

    bar.append("rect")
      .attr("width", x)
      .attr("height", this.get('height') - 1);

    bar.append("text")
      .attr("x", function (d) {
        return x(d) - 3;
      })
      .attr("y", this.get('height') / 2)
      .attr("dy", ".30em")
      .text(function (d) {
        return d;
      });
  }
});