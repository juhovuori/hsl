var express = require('express');
var router = express.Router();
var db = require('../db');
var request = require('request');

router.get('/all', function(req, res) {
  db.get_all( function (value, err) {

    if (err) {
      res.send(err);
    } else {
      //var vehicles = value.rows;
      res.send({all:value});
    }
  });
});

router.get('/line/:lineId', function(req, res) {
  db.get_line( req.params.lineId, function (value, err) {

    if (err) {
      res.send(err);
    } else {
      //var vehicles = value.rows;
      res.send({data:value});
    }
  });
});

router.get('/stop/:stopId', function(req, res) {
  db.get_stop( req.params.stopId, function (value, err) {

    if (err) {
      res.send(err);
    } else {
      //var vehicles = value.rows;
      res.send({data:value});
    }
  });
});

router.get('/vehicles', function(req, res) {
  db.get_vehicles( function (value, err) {

    if (err) {
      res.send(err);
    } else {
      var vehicles = value.rows;
      res.send({vehicles:vehicles});
    }
  });
});

router.get('/vehicles_direct', function(req, res) {

  var hsl_live_url = "http://83.145.232.209:10001/";
  var url = hsl_live_url + "?type=vehicles&lat1=60&lat2=61&lng1=23&lng2=26";
  request( url, function (error, response, body) {

    if (error) {
      res.send({error:error});
    } else if (body) {
      var lines = body.split("\n");
      var lines = lines.slice(0,lines.length-1);

      var vehicles = lines.map( function (line) {

        var cells = line.trim().split(";");
        return {
          'vehicle_id': cells[0],
          'route': cells[1],
          'lat': parseFloat(cells[2]),
          'lng': parseFloat(cells[3]),
          'bearing': parseInt(cells[4]),
          'direction': parseInt(cells[5]),
          'previous': parseInt(cells[6]),
          'current': parseInt(cells[7]),
          'departure': parseInt(cells[8]),
          'type': parseInt(cells[9]),
          'operator': cells[10],
          'name': cells[11],
          'speed': parseInt(cells[12]),
          'acceleration': parseInt(cells[13])
        };
      });
      res.send({vehicles:vehicles});
    }
  });

});


router.get('/stops', function(req, res) {
  db.get_stops( function (value, err) {
    if (err) {
      res.send(err);
    } else {
      var stops = value.rows.map( function (row) { return row.stop; });
      res.send({stops:stops});
    }
  });
});

router.get('/lines', function(req, res) {
  db.get_lines( function (value, err) {
    if (err) {
      res.send(err);
    } else {
      var lines = value.rows.map( function (row) { return row.line; });
      res.send({lines:lines});
    }
  });
});

router.get('/routes', function(req, res) {
  db.get_routes( function (value, err) {
    if (err) {
      res.send(err);
    } else {
      var routes = value.rows.map( function (row) { return row.route; });
      res.send({routes:routes});
    }
  });
});

module.exports = router;
