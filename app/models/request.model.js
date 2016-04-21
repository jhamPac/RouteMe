var mongoose = require('mongoose');
var GeoJSON = require('mongoose-geojson-schema');

var Coordinates = {
	longitude: Number,
	latitude: Number
}

var RequestSchema = new mongoose.Schema({
	time: {type: Date, default: Date.now},
    name: {type: String, ref: 'User'},
	wheelchair: Boolean,
    startLocation: Coordinates,
    endLocation: Coordinates,
    transType: String,
    completed: {type: Boolean, default: false}
});

mongoose.model('Request', RequestSchema);
