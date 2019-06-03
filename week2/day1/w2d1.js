
//* Lecture on HTTP and APIs

// from the API docs we know to use the below address for our request

// in terminal : curl https://www.metaweather.com/api/location/search?query=Toronto

// reslt would be a JSON object held within an array

// in order to use this data that comes back, we need a module to help handle the response

var request = require('request');

// will process the parameter through the command line 
// ! DON'T FORGET to pass Toronto when running node on this file

var query = process.argv[2];

request('https://www.metaweather.com/api/location/search?query=' + query, function (err, res, body) {

  if (err) {
    console.log('error occured: ', error);
  } 
  
    //if request was successful
  else if ( res.statusCode === 200 ){

    console.log(body);
    var data = JSON.parse( body );
    var weatherId = data[ 0 ][ 'woeid' ];
    console.log('weather id: ', weatherId );

    request ( 'https://www.metaweather.com/api/location/' + weatherId + '/', function (err, res, body ){

      if (res.statusCode === 200 ) {
        console.log( body );        
        var data = JSON.parse( body );
        var temp = data.consolidated_weather[ 0 ][ 'the_temp' ];
        console.log( 'Temperature in ', query, ' is ', temp );
        
      }
    });    
  }
});



