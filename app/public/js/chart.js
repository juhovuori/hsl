$(document).on('ready', function () {
  "use strict";

  var url;

  if (lineId) url = '/api/line/' + lineId;
  else url = '/api/stop/' + stopId;

  $.get(url)
    .done(drawChart)
    .fail( function(err) { console.log(err); });

  function seconds2Text(i) {
    var m = Math.floor(i / 60);
    var s = Math.round(i) % 60;
    if (m > 0) {
      return m + "m" + (s ? " " + s + "s" : "");
    } else {
      return s + "s";
    }
  }

  function hourMapper(hour, i) {
    return {
      label: i,
      value: hour.avg
    };
  }

  function drawChart(data) {

    var processed = [
      {
        key: "...",
        values: data.data.map(hourMapper)
      }
    ];

    nv.addGraph(function() {
      var chart = nv.models.discreteBarChart()
        .x(function(d) { return d.label })
        .y(function(d) { return d.value })
        .staggerLabels(true)
        .duration(350)
        .valueFormat(seconds2Text)
        .showValues(true);
      chart.tooltip.enabled(false);
      chart.yAxis.tickFormat(seconds2Text);
      d3.select('#chart svg')
        .datum(processed)
        .call(chart);

      nv.utils.windowResize(chart.update);

      return chart;
    });

  }

});

