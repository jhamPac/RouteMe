var mongoose = require('mongoose');
var isOnHill = require('../scripts/hill.js')

var Coordinates = {
	longitude: Number,
	latitude: Number
}

var RequestSchema = new mongoose.Schema({
	time: {type: Date, default: Date.now},
    name: {type: String, required: true},
	wheelchair: {type: Boolean, required: true},
    startLocation: {type: Coordinates, required: true},
    endLocation: {type: Coordinates, required: true},
    transType: String,
    completed: {type: Boolean, default: false}
});

RequestSchema.pre('save',
	function(next) {
		this.transType = this.wheelchair && isOnHill(this.endLocation)
						? "Shuttle" : "Bus";
		next();
	}
);

mongoose.model('Request', RequestSchema);
