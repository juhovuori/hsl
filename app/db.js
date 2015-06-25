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


function basic_db_call ( query, params, cb, post_process ) {

  if (!post_process) post_process = function (x) { return x; };

  pg.connect(conString, function (err, client, done) {
    if(err) {
      done();
      cb(null, err);
    } else {
      client.query(query, params, function(err, result) {
        done();
        if(err) {
          cb(null, err);
        } else {
          cb(post_process(result), null);
        }
      });
    }
  });

}

function get_all (cb) {
  basic_db_call('select * from omat', [], cb, process_omat);
}

function get_line (lineId, cb) {
  basic_db_call('select * from omat where line=$1', [lineId], cb, process_omat);
}

function get_stop (stopId, cb) {
  basic_db_call('select * from omat where stop=$1', [stopId], cb, process_omat);
}

function get_stops (cb) {
  basic_db_call('select distinct stop from omat', [], cb);
}

function get_lines (cb) {
  basic_db_call('select distinct line from omat', [], cb);
}

function get_vehicles (cb) {
  basic_db_call('select vehicles.* from vehicles, (select max(id) from vehicles, (select distinct vehicle_id from vehicles) as v_id group by vehicles.vehicle_id) as v where vehicles.id=v.max', [], cb);
}

function get_routes(cb) {
  basic_db_call('select distinct route from vehicles', [], cb);
}

exports.get_all = get_all
exports.get_line = get_line
exports.get_stop = get_stop
exports.get_stops = get_stops
exports.get_lines = get_lines
exports.get_routes = get_routes
exports.get_vehicles = get_vehicles

