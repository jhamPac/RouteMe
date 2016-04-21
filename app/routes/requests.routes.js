var requests = require('../../app/controllers/requests.controller');

module.exports = function(app) {
	app.route('/api/requests')
		.get(requests.list)
		.post(requests.create);
    
	app.route('/api/requests/:requestId')
		.get(requests.read)
		.delete(requests.delete);

	app.param('requestId', requests.requestByID);
};
