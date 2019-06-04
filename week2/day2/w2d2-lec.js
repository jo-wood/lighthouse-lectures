
let http = require('http');

// define app constants
// this isn't working our vagrant? but working with instructor
// in VagrantFile - somewhere in there will be a list of forwarded ports

//** browser needs to talk to the machine within my vagrant

const PORT =3000;

// create a server with a responder fn
// this fn will wait until a request is passed
// req.method - GET / will come bacl as request (what are you asking for from my server it is saying)
// the browser will also ask the server if we they have  an icon (favicon io) to send the response back with a nice icon


let server = http.createServer(function (req, res){
  var route = req.method + req.url;
  console.log('Request: ', route);
  //res.end('Hello from the other siiiiide...');
  if (route === 'GET/'){
    // homepage (send response that looks like a homepage)
    res.end(` 
    <html>
    <body>
      <h1>Weather Forcast</h1>
      <p> Please click a city: </p>
      <ul>
        <li><a href="/toronto">Toronto</a></li>
        <li><a href="/montreal">Montreal</a></li>
      </ul>
    </body>
    </html>
    `)
  } else if (route === 'GET/toronto'){
    // then assume they are looking for the weather in toronto
    res.end('kind of cloudy with a chance of showers')
  } else {
    res.statusCode = 404;
    res.end('We are not sure about that...')
  }
  
});

//! KILL my previously running code! stays running and can't connect again

//! in terminal kill -9 #
//! where find p # from command ps -ef

// start the server
server.listen(PORT, function (){
  console.log('Server listening on: http//localhost:%s', PORT);
});

