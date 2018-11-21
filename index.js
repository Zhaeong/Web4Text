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


app.get('/', (req, res) => res.send('peepee in my poopoo' + req.body.Body));

app.get('/tester', (req, res) => res.send('resu:' + req));

http.createServer(app).listen(8080, () => {
  console.log('Express server listening on port 8080');
});

