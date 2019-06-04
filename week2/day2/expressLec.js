

//! Paul Gonzalez check his github bc he put it in his lecture repo

let express = require('express');
// make sure npm install

const app = express();

app.set('view engine', 'ejs');

//** this is not the only view enngine uses but we will focus here
//** in our views folder, we would see the html pg that comes back
//! <%= JAVASCRIPT INSERTED INSIDE THE HTML=>

// define app constants
// this isn't working our vagrant? but working with instructor
// in VagrantFile - somewhere in there will be a list of forwarded ports

//** browser needs to talk to the machine within my vagrant

app.use('/static', express.static('public'))
// this allows us to access files within our comp (letting server know where to grab)

app.use(morgan('dev'))
//this middle ware helps to better capture how we handle the request (there are many middlewares)

app.use(bodyParse.urlencoded({extended: false}));
//another middleware that helps makethe data from response available - needs to be a post request tho

app.post ('/pay', (req, res){
  console.log('Hello...', req.body);
  //this will allow data from header such as firstnname to be easily accessible in an obj
})

//! middleware in use
//** when using middleware, but call next! to let the next process know its done and ready to continue program */

app.use(function(req, res, next) {
  console.log(req,url);
    //could add cookies, or session info or re-route to a differen url, let them know retrieving etc
   next()

})

// create a server with a responder fn
// this fn will wait until a request is passed
// req.method - GET / will come bacl as request (what are you asking for from my server it is saying)
// the browser will also ask the server if we they have  an icon (favicon io) to send the response back with a nice icon


app.get('/', function(req, res) {
  res.send('Welcome to Express Weather!')
});

  // use render instead to use a pre-build template to send the response
  // res.send('Weather in Toronto is cloudy!')
  //! render will run the js code, and serve the response back to client 
  //! <%= city => inside here will pass to our returned html page 
  //! <% > to outline ANY js
  //! ALL THIS CODE IS RUNNING ON THE SERVER with  & render allows our HTML to run on the server too

app.get('/toronto', function (req, res) {
  res.render('toronto', {city: '/torontoFile'}) //TODO check how he accessed the file in this parameter
});

// templates would allow us to pass multiple response based on request (use toronto here as only have 1)

// app.get('/montreal', function (req, res) {
//   res.render('toronto', {
//     city: 'Montreal'
//   })
// });

//** don't want to run multiple urls:
//** TEMPLATES RE-RENDER and don't need to restart the server! */

app.get('/city/:someCity', (req, res) => {
  console.log('Reg Params: ' , reg.params);
  let tempValues = {
    city: req.params.someCity,
    forecast: 'MetaWeather-LightCloud.png' //** see app.use above this would allow us to access the img in our views file */
// <img src='/static/<%= forecast %>'> 
  res.render('toronto', {torontoTemplate});


const PORT = process.env.PORT || 3000;

// start the server

server.listen(PORT, () => {             
  console.log('Example app listenining on port ${PORT}'); //is this jquery installed?
});
