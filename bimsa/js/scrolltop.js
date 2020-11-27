
(function() {
  'use strict';

  /**
   * MAIN STRUCTURE OF PLUGIN
   */
  var ScrollTop = {
    Init : function(ele, opts) {
      // Variable Initial
      this.$top = ele;
      this.duration = (opts && opts.duration) || 400 ;

      // Evnet scroll
      ScrollTop.Event();
    },

    Event : function() {
      this.$top.addEventListener('click', function(e) {

        // Shortcut
        var docElement = document.documentElement,
            requestAnimationFrame = window.requestAnimationFrame
            || function(callback) { return window.setTimeout(callback, 1000/60) },

            cancelAnimationFrame = window.cancelAnimationFrame
            || window.clearTimeout;

        // Get position-top and timer at begin
        var yBegin = (window.pageYOffset || docElement.scrollTop) - (docElement.clientTop || 0),
            yEnd   = 0,
            tBegin = +new Date(),
            n = 0,
            yCur, yEasing, timeCur, request;

        // Iteration
        function step() {
          n++;
          timeCur = (+new Date() - tBegin) / ScrollTop.duration;
          yCur = (1 - timeCur) * yBegin;
          yEasing = ScrollTop.Easing.easeOutQuad(null, +new Date() - tBegin, 0, 1, ScrollTop.duration);
          var yCur2 = (1 - yEasing) * yBegin;

          // console.log(+new Date() - tBegin);
          // console.log(yCur +' --------- '+ yCur2);

          // Make "yCur" always >= 0
          if( yCur < 0 ) yCur = 0;
          if( 0 < yCur2 && yCur2 < 1 ) yCur2 = 0;

          // Window ScrollTo
          window.scrollTo(0, yCur2);

          // Request Animation Frame -> make loop
          request = requestAnimationFrame(step);

          // Cancel Animation Frame
          if( yCur <= yEnd ) cancelAnimationFrame(request);
        }
        step();

        // Don't scrolltop with href="#"
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
      });
    },

    /**
     * Easing for Animation
     * Copyright : Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
     */
    Easing : {
      // Variable
      // x: percent (null)
      // t: current time (ms)
      // b: beginning value (gia tri 0)
      // c: change in value (gia tri 1)
      // d: duration (ms)
      easeOutQuad: function (x, t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
      }
    }
  };


  /**
   * CREATE NEW PLUGIN BY:
   *  new ScrollTop(element, options)
   */
  window.ScrollTop = function() {
    ScrollTop.Init(arguments[0], arguments[1]);
    return ScrollTop;
  }
}());


document.addEventListener('DOMContentLoaded', function() {
  var scrolltop = document.getElementById('scrolltop');
  new ScrollTop(scrolltop, {});
});
