import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return Ember.RSVP.hash({
      data: [
        {key: 'Abulia', value: 10},
        {key: 'Beteleuse', value: 20},
        {key: 'Cantaloupe', value: 30},
        {key: 'Dijkstra', value: 40}
      ],
      colors: ['#A60F2B', '#648C85', '#B3F2C9', '#528C18', '#C3F25C']
    });
  }
});
