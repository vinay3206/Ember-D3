import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'svg',
  classNames: ['pie-chart'],
  height: 360,
  width: 360,
  colors: [],
  data: [],
  labelAttr: 'key',
  valueAttr: 'value',

  radius: Ember.computed('height', 'width', function () {
    return Math.min(this.get('width'), this.get('height')) / 2;
  }),

  setup: Ember.on('didInsertElement', function () {
    this._super(... arguments);

    let color = this.get('colors.length') ?
      d3.scaleOrdinal().range(this.get('colors')) : d3.scaleOrdinal(d3.schemeCategory20b);

    var group = d3.select(this.$()[0])
      .attr('width', this.get('width'))
      .attr('height', this.get('height'))
      .append('g');

    let chart = group.attr('transform',
      `translate(${this.get('width') / 2}, ${this.get('height') / 2})`);

    let arc = d3.arc().innerRadius(0).outerRadius(this.get('radius'));

    let pie = d3.pie()
      .value((d) => {
        return Ember.get(d, this.get('valueAttr'));
      })
      .sort(null);

    chart.selectAll('path')
      .data(pie(this.get('data')))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => {
        return color(Ember.get(d.data, this.get('labelAttr')));
      })
  })
});