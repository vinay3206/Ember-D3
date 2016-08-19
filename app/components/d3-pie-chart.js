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
  donut: false,
  donutWidth: 75,
  legendRectSize: 18,
  legendSpacing: 4,
  radius: Ember.computed('height', 'width', function () {
    return Math.min(this.get('width'), this.get('height')) / 2;
  }),

  didInsertElement() {
    this._super(... arguments);

    let color = this.get('colors.length') ?
      d3.scaleOrdinal().range(this.get('colors')) : d3.scaleOrdinal(d3.schemeCategory20b);

    var group = d3.select(this.$()[0])
      .attr('width', this.get('width'))
      .attr('height', this.get('height'))
      .append('g');

    let chart = group.attr('transform',
      `translate(${this.get('width') / 2}, ${this.get('height') / 2})`);

    let innerRadius = this.get('donut') ? this.get('donutWidth') : 0;
    let arc = d3.arc().innerRadius(innerRadius).outerRadius(this.get('radius'));

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
      });

    let legend = chart.selectAll('legend')
      .data(color.domain())
      .enter()
      .append('g')
      .atr('class','legend')
      .attr('transform',(d,i) => {
        let height = this.get('legendRectSize') + this.get('legendSpacing');
        let offset = height * color.domain().length / 2;
        var horz = -2 * this.get('legendRectSize');
        var vert = i * height - offset ;
        return `translate(${horz},${vert})`;
      });
    legend.append('rect')
      .attr('width',this.get('legendRectSize'))
      .attr('height',this.get('legendRectSize'))
      .style('fill',color)
      .style('stroke',color);
    legend.append('text')
      .attr('x',this.get('legendRectSize') + this.get('legendSpacing'))
      .attr('y',this.get('legendRectSize') - this.get('legendSpacing'))
      .text((d) => d);
  }
});
