var pg = require('pg');
var Q = require('q');
var fs = require('fs');
var credentials = fs.readFileSync('credentials.conf','utf-8').split("\n");
var conString = credentials[2];

function process_omat (results) {

  var hours = []
  var i;
  for ( i = 0; i < 24; i++) { hours[i] = { n:0, avg:0 }; }
  for ( i in results.rows) {
    var row = results.rows[i];
    var i = Math.floor(row.time / 60 / 60);
    var hour = hours[i];
    hour.n++;
    hour.avg = hour.avg * (hour.n-1)/hour.n + row.delta/hour.n;
  }
  return hours;

}

function get_all (cb) {
  pg.connect(conString, function (err, client, done) {
    if(err) {
      done();
      cb(null, err);
    } else {
      var q = 'select * from omat';
      client.query(q, function(err, result) {
        done();
        if(err) {
          cb(null, err);
        } else {
          cb(process_omat(result), null);
        }
      });
    }
  });
}

function get_line (lineId, cb) {
  pg.connect(conString, function (err, client, done) {
    if(err) {
      done();
      cb(null, err);
    } else {
      var q = 'select * from omat where line=$1';
      client.query(q, [lineId], function(err, result) {
        done();
        if(err) {
          cb(null, err);
        } else {
          cb(process_omat(result), null);
        }
      });
    }
  });
}

function get_stop (stopId, cb) {
  pg.connect(conString, function (err, client, done) {
    if(err) {
      done();
      cb(null, err);
    } else {
      var q = 'select * from omat where stop=$1';
      client.query(q, [stopId], function(err, result) {
        done();
        if(err) {
          cb(null, err);
        } else {
          cb(process_omat(result), null);
        }
      });
    }
  });
}

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

exports.get_all = get_all
exports.get_line = get_line
exports.get_stop = get_stop
exports.get_routes = get_routes
exports.get_vehicles = get_vehicles

