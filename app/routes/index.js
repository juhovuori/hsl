var express = require('express');
var router = express.Router();
var db = require('../db');
var fs = require('fs');
var credentials = fs.readFileSync('credentials.conf','utf-8').split("\n");
var mapAccessToken = credentials[3];

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Express', mapAccessToken: mapAccessToken });
});

router.get('/map', function(req, res) {
  res.render('map', { title: 'Vehicles', mapAccessToken: mapAccessToken });
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
