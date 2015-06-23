var pg = require('pg');
var Q = require('q');
var fs = require('fs');
var credentials = fs.readFileSync('credentials.conf','utf-8').split("\n");
var conString = credentials[2];

function get_vehicles (cb) {
  pg.connect(conString, function (err, client, done) {

    if(err) {
      done();
      cb(null, err);
    } else {
      var q = 'select vehicles.* from vehicles, (select max(id) from vehicles, (select distinct vehicle_id from vehicles) as v_id group by vehicles.vehicle_id) as v where vehicles.id=v.max';
      client.query(q, [], function(err, result) {
        done();
        if(err) {
          cb(null, err);
        } else {
          cb(result, null);
        }
      });
    }
  });
}

function get_routes(cb) {

  pg.connect(conString, function (err, client, done) {
    if(err) {
      done();
      cb(null, err);
    } else {
      var q = 'select distinct route from vehicles';
      client.query(q, [], function(err, result) {
        done();
        if(err) {
          cb(null, err);
        } else {
          cb(result, null);
        }
      });
    }
  });

}

exports.get_routes = get_routes
exports.get_vehicles = get_vehicles

