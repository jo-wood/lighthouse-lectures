//  var fs = require('fs'),
//      input = fs.readFileSync('./input.txt').toString(),
//      numbersStrings = input.split('\n')

//TODO recheck how this code runs from lec notes - stack trace error?
//! check
//* comments
//? did they work


var input = ['1', '2', '3', '4', '5'];

var changes = [];

for (var i = 0; 0 < input.length; i++) {
  var string = input[i];
  changes.push(parseInt(string, 10));
}


var findTotalFrequency = function(changes) {

  var total = 0;

    for (var num of changes){
       if(!isNaN(num)){
          total += num;
      }
    }
  return total;
}

var totalFrequencyChange = findTotalFrequency(changes);
console.log(totalFrequencyChange);


var findRepeatingFrequency = function(changes) {
  var frequencyResutls = {};
  var runnningFrequency = 0;
 //? What did he say about why this ISN"T dangerous?
  //while(true){
    for (var i = 0; i < changes.length; i++) {
      var change = changes[i];
      runnningFrequency += change;
      if (frequencyResutls[runnningFrequency]){
        return runnningFrequency;
      }
      
      frequencyResults[runnningFrequency] = true;
    }
 // }
}

var repeatedFrequency = findRepeatingFrequency(changes);
console.log(repeatedFrequency);


