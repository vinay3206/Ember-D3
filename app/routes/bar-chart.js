import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return [4, 8, 15, 16, 23, 42, 99, 120, 35, 36, 34, 100];
  }
});