import Ember from 'ember';

export default Ember.Route.extend({
  data : [
    { key: 'Abulia', value: 25 },
    { key: 'Beteleuse', value: 25 },
    { key: 'Cantaloupe', value: 25 },
    { key: 'Dijkstra', value: 25 }
  ],
  model(){
    return this.get('data');
  }
});
