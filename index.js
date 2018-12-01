const http = require('http');
const express = require('express');

const bodyParser = require('body-parser');

const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));


app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  
  message = req.body.Body;
  console.log("Received SMS:" + message);

  twiml.message(
`You Sent:
` + message);
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());

});


app.get('/', (req, res) => res.send('peepee in dfdmy poopoo' + req.body.Body));

app.get('/tester', (req, res) => res.send('resu:' + req));


app.get('/get/*', (req, res) => 
{
	var searchRequest = req.originalUrl.split("/");
	var searchTerm = searchRequest[2];

	console.log("==========================");
	console.log("=======get request========");
	console.log(searchTerm);
	console.log("==========================");
	
	http.get('http://api.duckduckgo.com/?q=' + searchTerm + '&format=json', (resp) => {
	  let data = '';

	  // A chunk of data has been recieved.
	  resp.on('data', (chunk) => {
	    data += chunk;
	  });

	  // The whole response has been received. Print out the result.
	  resp.on('end', () => {
	    
	    var jsonResult = JSON.parse(data);

	    //The null, 2 makes it print to console in pretty way
	    var jsonString = JSON.stringify(jsonResult, null, 2); 

	    res.send('result:<br>' + jsonString);

	    console.log(jsonString);
	  });

	}).on("error", (err) => {
	  console.log("Error: " + err.message);
	});
	
});



http.createServer(app).listen(8080, () => {
  console.log('Express server listening on port 8080');
});

