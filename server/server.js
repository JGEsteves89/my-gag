const { GagApi } = require('./GagApi.js');
var express = require('express');

const api = new GagApi();

var app = express();

app.get('/', function (req, res) {});

var server = app.listen(8081, function () {
	var host = server.address().address;
	var port = server.address().port;
	api.getNext().then((data) => console.log(data));
	console.log('Example app listening at http://%s:%s', host, port);
});
