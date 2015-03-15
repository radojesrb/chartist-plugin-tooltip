/**
 * Chartist.js plugin to display a data label on top of the points in a line chart.
 *
 */
/* global Chartist */
(function(window, document, Chartist) {
  'use strict';

  var defaultOptions = {
    // showTooltips: true,
    // tooltipEvents: ['mousemove', 'touchstart', 'touchmove'],
    // labelClass: 'ct-label',
    // labelOffset: {
    //   x: 0,
    //   y: -10
    // },
    // textAnchor: 'middle'
  };

  Chartist.plugins = Chartist.plugins || {};
  Chartist.plugins.tooltip = function(options) {

    // options = Chartist.extend({}, defaultOptions, options);

    return function tooltip(chart) {
      var tooltipSelector = '.ct-point';
      if(chart instanceof Chartist.Bar) {
        tooltipSelector = '.ct-bar';
      }
      var $chart = $(chart.container);
      var $toolTip = $chart
      .append('<div class="tooltip"></div>')
      .find('.tooltip')
      .hide();

      $chart.on('mouseenter', tooltipSelector, function() {
        var $point = Ember.$(this),
        value = $point.attr('ct:value'),
        seriesName = $point.attr('ct:meta');
        $toolTip.html(seriesName + '<br>' + value).show();
      });

      $chart.on('mouseleave', tooltipSelector, function() {
        $toolTip.hide();
      });

      $chart.on('mousemove', function(event) {
        $toolTip.css({
          left: (event.offsetX || event.originalEvent.layerX) - $toolTip.width() / 2 - 10,
          top: (event.offsetY || event.originalEvent.layerY) - $toolTip.height() - 40
        });
      });
    }
  };

}(window, document, Chartist));
