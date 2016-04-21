var http = require('http');
var url = require('url');

var isOnHill = require("./hill.js");

server = http.createServer(function(request, response) {
	parsedUrl = url.parse(request.url, true);
	console.log("request: " + JSON.stringify(parsedUrl.query));
	if (parsedUrl.query.longitude && parsedUrl.query.latitude) {
		response.writeHead(200, {"Content-Type": "application/json"});
		var hill = JSON.stringify({
			hill: isOnHill({
				longitude:parseInt(parsedUrl.query.longitude),
				latitude:parseInt(parsedUrl.query.latitude)
			})
		});
		console.log("response: ", hill);
		response.end(hill);
	} else {
		response.writeHead(404);
		response.end();
	}
});
server.listen(3000);
console.log("listening to server at localhost:3000");
console.log("request format: http://localhost:3000/?longitude=0&latitude=0\n");	