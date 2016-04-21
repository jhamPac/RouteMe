var request = require('request-promise');
var deasync = require('deasync');
var geolib = require('geolib');

function isOnHill(coord) {
	var diff = 1 / 111319;
	var square = [coord];
	for (var i = -1; i <= 1; i++) {
		for (var j = -1; j <= 1; j++) {
			if (i != 0 || j != 0)
				square.push({
					longitude: coord.longitude + diff * i,
					latitude: coord.latitude + diff * j
				});
		}
	}
	// console.log(square);
	var locations = square.map(function(d) {
		return d.latitude + ',' + d.longitude;
	}).join('|');
	var response;
	request(`https://maps.googleapis.com/maps/api/elevation/json?locations=${locations}&key=AIzaSyA28XjLqIDdMwpxdqGSlbm6kPwahFzj43s`)
	 .then(function(res) {
		response = res;
	});
	while(response === undefined) {
		deasync.runLoopOnce();
    }
	var elevations = JSON.parse(response).results.map(function(d) {
		return d.elevation;
	});
	for (var i = 1; i < elevations.length; i++) {
		var dist = geolib.getDistance(square[0], square[i]);
		var elevDiff = Math.abs(elevations[0] - elevations[i]);
		if ((Math.atan(elevDiff / dist) * 180 / Math.PI) / 90 > .08)
			return true;
	}
	return false;
}

hill = isOnHill({longitude:-122.441172, latitude:47.255124});
notHill = isOnHill({longitude:-122.444844, latitude:47.255058});

console.log("hill: " + hill);
console.log("not hill: " + notHill);