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

  function exampleData() {
    return  [ 
      {
        key: "Cumulative Return",
        values: [
          { 
            "label" : "A Label" ,
            "value" : -29.765957771107
          } , 
          { 
            "label" : "B Label" , 
            "value" : 0
          } , 
          { 
            "label" : "C Label" , 
            "value" : 32.807804682612
          } , 
          { 
            "label" : "D Label" , 
            "value" : 196.45946739256
          } , 
          { 
            "label" : "E Label" ,
            "value" : 0.19434030906893
          } , 
          { 
            "label" : "F Label" , 
            "value" : -98.079782601442
          } , 
          { 
            "label" : "G Label" , 
            "value" : -13.925743130903
          } , 
          { 
            "label" : "H Label" , 
            "value" : -5.1387322875705
          }
        ]
      }
    ];
  }
});
