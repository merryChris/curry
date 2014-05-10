(function($) {
  /**
   * @class: HomeView implements the page logic of home page.
   */
  Curry.Views.Home = Curry.Views.BaseView.extend({
    //NOTE: _container points to div#container in js template home/game
    //NOTE: el is div#main surrounding _container
    name: 'home',

    events: _.extend({
      //TODO: zanwen, should add <span> to toggle game start & end.
      'click #map': '_onGameStart',
      'blur #map': '_onGameFail',
      'keydown #map': '_onEnterDirection',
      'keyup #map': '_onLoseDirection'
    }, Curry.Views.BaseView.prototype.events),

    beforeRender: function() {
      this.game = {};
      this.game.player = this._models.player;

      Curry.Utils.EventManager.bind(Curry.Events.Views.Home.GAMEOVER, this._onGameOver, this);
    },
    renderInternal: function() {
      if (this.game && this.game.player) {
        this._container.html(this.renderTemplate('home/game'));
        this.game.playgroundEl = this._container.find('.playground');
        this.game.locationEl = this._container.find('#player');
      } else {
        // TODO: stone, consider other situations.
      }
    },

    _onGameStart: function(event) {
      this._container.find('#map').attr('tabindex', 0);
      this._container.find('#map').focus();
      this.game.running = true;
      this.game.keypressing = -1;

      var self = this.game;
      var drawStuffs = function() {
        self.player.updateCurrentStatus(self.keypressing);
        self.player.updateCurrentPosition();
        var currentLocation = self.player.getCurrentPosition();
        self.locationEl.attr('class', self.player.className);
        self.locationEl.css('top',  currentLocation[0]+'px');
        self.locationEl.css('left', currentLocation[1]+'px');

        var tempGrid = self.player.updateCurrentPath();
        if (!Curry.Utils.isBlank(tempGrid)) {
          var pathId = 'path-' + tempGrid.id;
          self.locationEl.before("<div id='" + pathId + "'></div>");
          self.playgroundEl.find('#'+pathId).css('top',    (tempGrid.position[0]*tempGrid.size)+'px');
          self.playgroundEl.find('#'+pathId).css('left',   (tempGrid.position[1]*tempGrid.size)+'px');
          self.playgroundEl.find('#'+pathId).css('width',  tempGrid.size+'px');
          self.playgroundEl.find('#'+pathId).css('height', tempGrid.size+'px');
          self.playgroundEl.find('#'+pathId).fadeIn('slow');
        }
      };
      this.game.timer = setInterval(drawStuffs, Curry.Constants.GAME.REFRESHINTERVAL);
    },
    _onGameFail: function(evnet) {
      this._container.find('#map').removeAttr('tabindex');
      this.game.running = false;
      clearInterval(this.game.timer);
    },
    _onGameOver: function() {
      // TODO: stone, make some ending effect that is more meaningful.
      alert("おめでとう！");
      // this._vanish();
    },
    _onEnterDirection: function(event) {
      // Only one of 'W', 'A', 'S', 'D' can be pressed anytime.
      if (this.game.keypressing != -1) return;
      this.game.keypressing = _.indexOf(Curry.Constants.KEYCODES.DIRECTIONLIST, event.keyCode);
    },
    _onLoseDirection: function(event) {
      this.game.keypressing = -1;
    }
  });
}).call(this, jQuery);
