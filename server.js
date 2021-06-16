// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  let dateStringPattern = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
  let unixPattern = /\d{13}/;
  if (!req.params.date || unixPattern.test(req.params.date) || dateStringPattern.test(req.params.date)) {
    let date;
    if(!req.params.date) {
      date = new Date();
    } else if (dateStringPattern.test(req.params.date)) {
      date = new Date(req.params.date);
    } else {
      date = new Date(Number(req.params.date));
    }
    res.json({unix: date.getTime(), utc: date.toUTCString()});
  } else {
    res.json({"error": "Invalid Date"});
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
