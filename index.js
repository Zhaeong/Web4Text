const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const app = express();


//project specific modules
const scraper = require('./scraper/webscraper.js');

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sms', (req, res) => 
{
	const twiml = new MessagingResponse();
  
	message = req.body.Body;
	console.log("Received SMS:" + message);

	scraper.getWikiPage(message, (result) => 
	{
		result = result.substring(0, 200);

		console.log("Sent:" + result);
		
		twiml.message(`Wiki:
  		` + result);
	  	res.writeHead(200, {'Content-Type': 'text/xml'});
	  	res.end(twiml.toString());
	});

});

app.get('/', (req, res) => 
{
	res.send('This page is currently: ' + req.body.Body)
});

app.get('/tester', (req, res) => res.send('resu:' + req));

app.get('/get/*', (req, res) => 
{
	var searchRequest = req.originalUrl.split("/");
	var searchTerm = searchRequest[2];

	console.log("==========================");
	console.log("=======get request========");
	console.log(searchTerm);
	console.log("==========================");

	scraper.getDDGPage(searchTerm, (result) => 
	{
		res.send('result:<br> <pre>' + result + '</pre>');
	});
});

app.get('/wiki/*', (req, res) =>
{
	var searchRequest = req.originalUrl.split("/");
	var searchTerm = searchRequest[2];

	console.log("==========================");
	console.log("=======wiki request========");
	console.log(searchTerm);
	console.log("==========================");

	scraper.getWikiPage(searchTerm, (result) => 
	{
		result = result.substring(0, 200);
		console.log("The result is:" + result);
		res.send('result:<br> <pre>' + result + '</pre>');
	});
});

http.createServer(app).listen(8080, () => {
  console.log('Express server listening on port 8080');
});

