var mongoose = require('mongoose');

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

mongoose.model('Request', RequestSchema);
