(function($) {
  /**
   * @class: HomeView implements the page logic of home page.
   */
  Curry.Views.Home = Curry.Views.BaseView.extend({
    //TODO: zacky, need further design for home page.
    //NOTE: el is div#main surrounding _container
    name: 'home',

    events: _.extend({
    }, Curry.Views.BaseView.prototype.events),

    beforeRender: function() {},
    renderInternal: function() {}
  });
}).call(this, jQuery);
