var express = require('express');
var router = express.Router();
var fs = require('fs');
var credentials = fs.readFileSync('credentials.conf','utf-8').split("\n");
var mapAccessToken = credentials[3];

router.get('/', function(req, res) {
  res.render('index', { title: 'Express', mapAccessToken: mapAccessToken });
});

router.get('/map', function(req, res) {
  res.render('map', { title: 'Vehicles', mapAccessToken: mapAccessToken });
});

router.get('/line/:lineId', function(req, res) {
  var lineId = req.params.lineId.toUpperCase().replace(/[^0-9A-Z]/,'');
  res.render('chart', { title: 'Line ' + lineId, lineId: lineId});
});

router.get('/stop/:stopId', function(req, res) {
  var stopId = req.params.stopId.toUpperCase().replace(/[^0-9A-Z]/,'');
  res.render('chart', { title: 'Stop ' + req.params.stopId, stopId: stopId });
});


module.exports = router;
