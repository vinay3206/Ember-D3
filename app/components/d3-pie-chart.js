import Ember from 'ember';

export default Ember.Component.extend({
  height: 360,
  width: 360,
  colors: [],
  data:[],
  optionLabelPath: 'key',
  optionValuePath: 'value',
  tagName: 'svg',
  classNames: ['bar-chart'],
  radius: Ember.computed('height', 'width', function() {
    return Math.min(this.get('width'),this.get('height')) / 2;
  }),
  setup: Ember.on('didInsertElement', function() {
    let color;
    color = this.get('color.length') ? d3.scaleOrdinal().range(this.get('colors')) : d3.scaleOrdinal(d3.schemeCategory20b);
    let chart = d3.select(this.$()[0]);
    chart
    .attr('width',this.get('width'))
    .attr('height',this.get('height'))
    .append('g')
    .attr('tranform',`translate(${this.get('width') / 2},${this.get('height') / 2})`);

    let arc = d3.arc()
      // set innerRadius 0 for now. will change this
      .innerRadius(0)
      .outerRadius(this.get('radius'));

    let pie = d3.pie()
      .value((d) => {
        return Ember.get(d,this.get('optionValuePath'));
      })
      .sort(null);

    chart.selectAll('path')
        .data(pie(this.get('data')))
        .enter()
        .append('path')
          .attr('d',arc)
          .attr('fill',(d) => {
            return color(Ember.get(d.data,this.get('optionLabelPath')));
          });

  })
});
