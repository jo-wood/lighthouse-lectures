//High order fn
let num = 4;

function addTwo(number, cb) {

  setTimeout(function () {
    num = number + 2;
    console.log(cb);
    console.log("3 second has passed!!");
    console.log("number is now: ", num);
    cb(num);
  }, 3000)
  // setTimeout(function () {
  //   num = number + 2;
  //   console.log(cb);
  //   console.log("1 second has passed!!");
  //   console.log("number is now: ", num);
  //   cb(num);
  // }, 1000)
  return num;
}

// The function within addTwo below (arg2) is the callback:

let numberReturned = addTwo(num, function(number) {
  console.log("line 24: ", number)
  return number;
  //console.log("I got the number and it is ---> ", number);
});

console.log("Number has been returned from fn: ", numberReturned);

let secondCall = (numberReturned(num, addTwo()));

console.log("did number update?: ", secondCall);