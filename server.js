// HTTP PORTION
var http = require('http');
var fs = require('fs');
var httpServer = http.createServer(requestHandler);
var url = require('url');
httpServer.listen(8080);

function requestHandler(req, res) {

	var parsedUrl = url.parse(req.url);
	console.log("The Request is: " + parsedUrl.pathname);
		
	fs.readFile(__dirname + parsedUrl.pathname, 
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading ' + parsedUrl.pathname);
			}
			res.writeHead(200);
			res.end(data);
  		}
  	);
  	
}

var count=1;
var out=0;
// WEBSOCKET PORTION


var io = require('socket.io').listen(httpServer);

setInterval(function() {
	count++;
	out = count%8;
  	io.sockets.emit('clear', out);
}, 30000 );


io.sockets.on('connection', 

	function (socket) {
	
		console.log("We have a new client: " + socket.id);
		
		///MY SOCKET EVENTS HERE
		socket.on('drawing', function(data){
			socket.broadcast.emit('otherdrawing', data);
		});

		


		socket.on('disconnect', function() {
			console.log("Client has disconnected " + socket.id);
		});
	}
);