(function($) {
  /**
   * @class: MasterviewController implements routing stuffs in masterview.
   */
  Curry.Routers.MasterviewController = Curry.Routers.BaseController.extend({
    name: 'masterview',

    _context: 'masterview',

    _template: 'masterview/index',

    _generatePageModels: function(configs) {
      this.pageModels = {};
      this.pageModels['player'] = new Curry.Models.GamePlayer({class_prefix: 'figure'});

      return this.pageModels;
    },

    index: function() {
      this._generatePageConfigs(this._context);
      this._generatePageModels(this.pageConfigs);
      var masterview = new Curry.Views.Masterview({template: this._template, context: this._context, models: this.pageModels});
      $('#masterhead-container').empty().append(masterview.render().el);
    }
  });
}).call(this, jQuery);
