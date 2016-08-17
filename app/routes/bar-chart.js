import Ember from 'ember';

export default Ember.Route.extend({
  data: [4, 8, 15, 16, 23, 42, 99, 120, 35, 36, 34,278],
  setupController (controller, model){
    this._super(controller, model);
    controller.setProperties({
      data: this.data
    });
  }
});