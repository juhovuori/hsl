$(document).on('ready', function () {

  var url;
  if (lineId) url = '/api/line/' + lineId;
  else url = '/api/stop/' + stopId;

  $.get(url)
    .done(drawChart)
    .fail( function(err) { console.log(err); });

  function hourMapper(hour, i) {
    return {
      label: i,
      value: hour.avg
    };
  }

  function drawChart(data) {

    console.log(data);
    var processed = [
      {
        key: "...",
        values: data.data.map(hourMapper)
      }
    ];

    console.log(processed);
    nv.addGraph(function() {
      var chart = nv.models.discreteBarChart()
        .x(function(d) { return d.label })
        .y(function(d) { return d.value })
        .staggerLabels(true)
        //.tooltips(false)
        //.transitionDuration(350);
        .showValues(true);

      d3.select('#chart svg')
        .datum(processed)
        .call(chart);

      nv.utils.windowResize(chart.update);

      return chart;
    });

  }

});
