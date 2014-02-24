(function($){
  /**
   * @namespace String Utils
   */
  Curry.Utils.Str = {
    /**
     * Removes whitespace from the front and the end of the specified string.
     * @param {string} stringToTrim The input String whose beginning and ending whitespace will be removed
     * @returns {string}  A String with whitespace removed from the begining and end
     */
    trim: function(stringToTrim) {
      return stringToTrim.replace(/^\s+|\s+$/g,"");
    },

    /**
     * Removes whitespace from the front of the specified string.
     * @param {string} stringToTrim The input String whose beginning whitespace will be removed
     * @returns {string}  A String with whitespace removed from the begining
     */
    ltrim: function(stringToTrim) {
      return stringToTrim.replace(/^\s+/,"");
    },

    /**
     * Removes whitespace from the end of the specified string.
     * @param {string} stringToTrim The input String whose ending whitespace will be removed
     * @returns {string}  A String with whitespace removed from the end
     */
    rtrim: function(stringToTrim) {
      return stringToTrim.replace(/\s+$/,"");
    },

    /**
     * Capitalizes the first letter of a string and downcases all the others.
     * @param {String} s string to be evaluated
     * @return {Boolean} boolean of result
     */
    capitalize: function(s) {
      return s.charAt(0).toUpperCase() + s.substring(1).toLowerCase();
    },

    /**
     * Camelize a non-camel style string into a camel style string. i.e.: TEST_STRING => testString
     * @param {string} str Non-camel style string to camelize
     * @param {boolean} [firstCapitalize=false] whether upcase first letter
     */
    camelize: function(str, firstCapitalize) {
      return str.toLowerCase().replace (/(?:^|[-_])(\w)/g, function (_, c, index) {
        return index == 0 && !firstCapitalize ? c : c.toUpperCase ();
      })
    },

    /**
     * De-camelize a camel style string into a normal string with lower case words. i.e.: testString => test string
     * @param {string} str Camel style string to de-camelize
     * @param {string} [connector=' '] Character to connect the words, default is white space
     */
    decamelize: function(str, connector) {
      connector = connector || ' ';
      return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index == 0 ? letter.toLowerCase() : connector + letter.toLowerCase();
      });
    },
  };
}).call(this, jQuery);