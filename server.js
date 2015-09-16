'use stric';

var http = require('http');
var fs = require('fs');
var uri = require('url');
var path = require('path');
var util = require('util');

function getMimeType(fpath) {
	var pos = fpath.lastIndexOf('.') + 1;
	var ext = fpath.substring(pos);

	var mimeType = 'text/plain';
	switch (ext) {
		case 'html' : mimeType = 'text/html'; break;
		case 'css'  : mimeType = 'text/css'; break;
		case 'js'  : mimeType = 'application/javascript'; break;
		
		case 'png': mimeType = 'image/png'; break;
		case 'ico': mimeType = 'image/x-icon'; break; // 'image/vnd.microsoft.icon'; break
		case 'jpeg':
		case 'jpg': mimeType = 'image/jpeg'; break;
		
		case 'eot': mimeType = 'application/vnd.ms-fontobject'; break;
		case 'svg': mimeType = 'image/svg+xml'; break;
		case 'ttf': mimeType = 'application/x-font-ttf'; break;
		case 'woff': mimeType = 'application/x-font-woff'; break;
		case 'woff2': mimeType = 'application/x-font-woff'; break;
	}
	return mimeType;
}

function sendFile(req, res, fpath) {
	var mimeType = getMimeType(fpath);
	var statusCode = 200;
	
	fs.readFile(fpath, function readFileCB(err, data) {
		var content;
			
		if (err) {
			console.trace(err, 'ERROR sendFile.readFileCB fpath: "' + fpath + '" ERR: >>> ');
			mimeType = 'text/plain';
			statusCode = 400;
			content = 'HTTP 400: Not found';
			res.end(content);
		} else {
			if (util.isString(data)) {
				content = data;
			} else if (mimeType.indexOf('text/') == 0) {
				content = data.toString();
			} else {
				content = data;
			}
			res.writeHead(statusCode, {'Content-Type': mimeType});
			res.end(content);
		}
	});
}

function answerRest(req, res, restPath, search) {
	var paths = restPath.split('/');
	console.log('>>> answerRest: paths: ' + paths);
	
	if (paths[0] == 'rest') {
		if (paths[1] == 'hello' && req.method === 'GET') {
			res.writeHead(200, {'Content-Type': 'application/json; charset=UTF-8'});
			res.end('Say: Hello World!');
			return;
		} 
	}

	// Invalid resource url
	res.writeHead(400, {'Content-Type': 'application/json; charset=UTF-8'});
	res.end('{"error": {"statusCode":"400", "statusMessage":"Not found", "description":"Resource does not exist on this REST endpoint."} }');
}

function requestCB(req, res) {
	console.log('ENTER requestCB');
	console.log('>>> %s: %s %s', 'requestCB', req.method, req.url);
	
	// Clean url fragment (path, file, ext.).
	var urlPath = req.url[0]==='/' ?  req.url.substring(1) : req.url; // Strip leading "/"
	
	// Separate search query from url fragment.
	var search = '';
	if (urlPath.lastIndexOf('?') >= 0) {
		var pos = urlPath.lastIndexOf('?');
		search = urlPath.substring(pos);
		urlPath = urlPath.substring(0, pos);
	}
	
	// Route
	if(req.url.indexOf('/rest') === 0) {
		// *** Answer REST endpoint ***
		var restPath = urlPath;
		answerRest(req, res, restPath, search);
	} else if(req.url.indexOf('/') === 0) {
		// *** Deliver static file ***
		// Map file path from url fragment
		var fpath = './app' + '/' + urlPath;
		// send the file to the client
		sendFile(req, res, fpath);
	} else {
		// *** Ups! no valid resource found! ***
		res.writeHead(400, {'Content-Type': 'text/plain'});
		res.end('HTTP 400 - Not found');
	}
}

// Run the server
http
.createServer(requestCB)
.listen(8081, 'localhost')
;
var wellcome = 'server.js, listening at http://localhost:8081/' 
console.log(wellcome);
console.log('');
