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

router.get('/line', function(req, res) {
  res.render('line', { title: 'Line' });
});

router.get('/stop', function(req, res) {
  res.render('stop', { title: 'Stop' });
});


module.exports = router;
