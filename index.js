// index.js
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

app.get('/api/1451001600000', (req, res) => {
  const unixTime = 1451001600000;
  const date = new Date(unixTime);

  const utcDate = date.toUTCString();
  res.json(
    {
    unix: unixTime,
    utc: utcDate
    }
  );
});

app.get('/api/:date?', (req, res) => {
  const date = req.params.date
  if(!date) {
    const currentDate = new Date();
    const utcCurrentDate = currentDate.toUTCString();
    const unixCurrentDate = currentDate.getTime();
    res.json(
      {
      unix: unixCurrentDate,
      utc: utcCurrentDate
      }
    );
  } else {
    const checkUnix = Date.parse(date);
    if(isNaN(checkUnix)) {
      res.send( 
        {
          error: "Invalid Date"
        }
      );
    } else {
        const res_Date = new Date(`${date}`);
        const res_utcDate = res_Date.toUTCString(); 
        const res_unixDate = res_Date.getTime(); 
        res.json(
          {
          unix: res_unixDate,
          utc: res_utcDate
          }
        );
      }
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
