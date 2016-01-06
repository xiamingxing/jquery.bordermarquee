/*
 * bordermarquee
 * https://github.com/xiamingxing/jquery.bordermarquee
 *
 * Copyright (c) 2016 xiamingxing
 * Licensed under the MIT license.
 */

(function($) {

  // Collection method.
  $.fn.bordermarquee = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.bordermarquee = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.bordermarquee.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.bordermarquee.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].bordermarquee = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
