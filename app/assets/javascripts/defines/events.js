// Define all Curry related events.

Curry.Events = {
  COLLECTION: _.clone(Backbone.Events),

  Views: {
    BEFORE_SWAP: 'BEFORE-SWAP',
    Header: {
      LOGGEDIN: 'LOGGED-IN',
      LOGGEDOUT: 'LOGGED-OUT'
    },
    Masterview: {
      GAMEOVER: 'GAME-OVER',
    },
    Dashboard: {
      INFOUPDATE: 'INFO-UPDATE',
    }
  },

  APPLICATION: {
    READY: 'READY'
  },

  END: {}
};
