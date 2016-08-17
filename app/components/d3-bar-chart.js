import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement(){
    this._super(...arguments);
    var _chartData = [4, 8, 15, 16, 23, 42];

    var x = d3.scaleLinear()
      .domain([0, d3.max(_chartData)])
      .range([0, 420]);

    var chart = d3.select(this.$('bar-chart')[0]);
    var bar = chart.selectAll('div');
    var barUpdate = bar.data(_chartData);
    var barEnter = barUpdate.enter().append($('div'));
    barEnter.style('width', function (d) {
      return x(d) + "px";
    });
    barEnter.text(function (d) {
      return d;
    });
    console.log(barEnter);
    return barEnter.exit().remove();
  }
});
