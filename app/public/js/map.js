$(document).on('ready', function () {
  "use strict";

  var h = $(window).height();
  $('#map').height(h-50);

  var map = L.map('map').setView([60.175, 24.94], 13);
  var markers = {};
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: window.mapAccessToken
  }).addTo(map);

  setInterval(refresh,1000);
  refresh();

  $('#map').height($(window).height()-50);

  function refresh() {
    $.get('/api/vehicles_direct')
      .done(placeVehicles)
      .fail( function(err) { console.log(err); });
  }

  function placeVehicles(data) {

    /*
    while (markers.length > data.vehicles.length) {
      markers.push
    }

    */
    var old_keys = {};
    for (var key in markers) {
      old_keys[key] = true;
    }
    for (var i in data.vehicles) {
      var vehicle = data.vehicles[i];
      var key = vehicle.vehicle_id
      if (old_keys[key]) {
        delete old_keys[key];
        var newLocation = new L.LatLng(vehicle.lng, vehicle.lat);
        markers[key].setLatLng(newLocation);
      } else {
        var marker = L.marker([vehicle.lng, vehicle.lat]).addTo(map);
        markers[key] = marker;
      }
      var popup = "<h3>" + vehicle.vehicle_id + "</h3>" +
                  "<p>" + vehicle.route + "</p>" +
                  "<p>" + vehicle.lat + ", " + vehicle.lng + "</p>";
      markers[key].bindPopup(popup);
    }
    for (var key in old_keys) {
      map.removeLayer(markers[key]);
      delete markers[key];
    }
  }

});

