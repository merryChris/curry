(function($) {
  /**
   * @class: Masterview implements the page logic of masterview.
   */
  Curry.Views.Masterview = Curry.Views.BaseView.extend({
    //NOTE: _container points to div#container in js template masterview/game
    //NOTE: el is div#main surrounding _container
    name: 'masterview',

    events: _.extend({
      'click .view-scroller': '_onClickSlidesScroller',
      //TODO: zanwen, should add <span> to toggle game start & end.
      'click .map': '_onGameStart',
      'blur .map': '_onGameFail',
      'keydown .map': '_onEnterDirection',
      'keyup .map': '_onLoseDirection'
    }, Curry.Views.BaseView.prototype.events),

    beforeRender: function() {
      this.game = {};
      this.game.player = this._models.player;

      Curry.Utils.EventManager.bind(Curry.Events.Views.Masterview.GAMEOVER, this._onGameOver, this);
    },

    renderInternal: function() {
      this.slidesEl = this._container.find('.slides-container').empty();
      this.scrollerEl   = this._container.find('.scroller-container').empty();

      this.slidesEl.append(this.renderTemplate('masterview/poster'));
      this.scrollerEl.append(this._masterviewScrollerHtml);

      if (this.game && this.game.player) {
        this.slidesEl.append(this.renderTemplate('masterview/game'));
        this.game.playgroundEl = this._container.find('.playground');
        this.game.locationEl = this._container.find('#player');
        this.scrollerEl.append(this._masterviewScrollerHtml);
      }

      this.switchSlides({from: -1, to: 0})
    },

    switchSlides: function(options) {
      if (options.from == options.to) return;

      var slides = this.slidesEl.children();
      var scrollers = this.scrollerEl.children();
      if (options.from == -1) {
        for (var i=0; i<slides.length; i++) {
          i == options.to ? ($(slides[i]).show() && $(scrollers[i]).addClass('active')) : $(slides[i]).hide();
        }
      } else {
        $(scrollers[options.from]).removeClass('active');
        $(scrollers[options.to]).addClass('active');
        $(slides[options.from]).fadeOut('fast', function() {
          $(slides[options.to]).fadeIn('fast');
        });
      }
    },

    _onClickSlidesScroller: function(evt) {
      if (evt.target) {
        var scrollers = this.scrollerEl.children();
        var from = _.indexOf(scrollers, scrollers.filter('.active')[0]);
        var to   = _.indexOf(scrollers, evt.target);
        this.switchSlides({from: from, to: to});
      }
    },

    _onGameStart: function(evt) {
      this._container.find('.map').attr('tabindex', 0);
      this._container.find('.map').focus();
      this.game.running = true;
      this.game.keypressing = -1;
      this.game.player.initializeAttr();

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
      this._container.find('.map').removeAttr('tabindex');
      this.game.running = false;
      this.game.playgroundEl.children().not('#player').remove();
      this.game.playgroundEl.find('#player').removeClass();
      clearInterval(this.game.timer);
    },
    _onGameOver: function() {
      // TODO: stone, make some ending effect that is more meaningful.
      alert("おめでとう！");
      // this._vanish();
    },
    _onEnterDirection: function(evt) {
      // Only one of 'W', 'A', 'S', 'D' can be pressed anytime.
      if (this.game.keypressing != -1) return;
      this.game.keypressing = _.indexOf(Curry.Constants.KEYCODES.DIRECTIONLIST, evt.keyCode);
    },
    _onLoseDirection: function(evt) {
      this.game.keypressing = -1;
    }
  });
}).call(this, jQuery);
