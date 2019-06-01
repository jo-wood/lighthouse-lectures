## Day 4 - Callbacks

- If we were to log log the calling of `helloWorld()` it will return undefined

```javascript
function helloWorld(){
  console.log('Hello World');
}

helloWorld();
```
- fns take an arg, perform an action, and return an output
- multiple ways to define a function 


**Fn DECLARATION:**

```javascript
function helloWorld(person, number, arr, object){
  console.log(arr)
  console.log(number)
  console.log(object.x)
  console.log(person + ': Hello World');
  return 1;
}
//FUNCTION CALL
let obj = {x: 32}
let number = helloWorld('Joanna', 10, [1,2,3,4,5], obj);
console.log(number); // returns 1
```

**ES6 Syntax:**

```javascript
let hiEveryone = () => {
  console.log('Hi everyone!!!');
  return 12;
}
```

**Fn EXPRESSION:**

```javascript
var hi = function() {
  console.log('Hi There!'){

  }
//FUNCTION CALL
  hi();
}
```

We can accept all these data types, including objects - we can also do so with functions as arguments.


**Fn as arg**

```javascript
//! HIGH ORDER FUNCTION is hello world as it is accepting a fn 

                    //this func as arg is the callback
function helloWorld(func){
  func()
  return 1;
}

var hi = function() {
  console.log('Hi There!'){
  }

helloWorld(hi);  
}
```


```javascript
//High order fn
function highOrderFunction(callback) {
  console.log("I'm abou tto run the callback fn that was passed into me!");
  callback();
}

higherOrderFunction(function(){
  console.log("I'm the callback function!")
});

```



```javascript
//High order fn
function backward(arr, callback) {
  for (let i = arr.length - 1; i >= 0; i--){
    console.log(arr[i];)
  }
  //codehere
}

//rather than have to call a fn multiple times with a changing # of arr's being passed:
 
i = 0;

let array = ['hello', 'lighthouse-labs', 'and', 'world'];
backward(array, function(e){
  console.log((i + ") This is a word and it is: ", e));
  i++;
});
```

-this makes the code easier to maintain
-it also is better for computing speed
-js is asyncronous, therefore if the function you are running takes a very long time to complete, using a callback helps it to carry on with the rest of the program


```javascript
//High order fn
function addTwo(number){
  let num = undefined;
  setTimeout(function(){
  num = number + 2;
  console.log("1 second has passed!!");
  console.log("number is now: ", num);
  }, 1000)
  return num;

}

let numberReturned = addTwo(4);
console.log("Number has been returned from fn: ", numberReturned );

// undefined will return first
//  it technically is running setTimeout fn first, but it is 'taking longer' so it comepletes the return before setTimeout has finished

```



```javascript
//High order fn
function addTwo(number, cb){
  let num = undefined;
  setTimeout(function(){
  num = number + 2;
  console.log(cb);
  console.log("1 second has passed!!");
  console.log("number is now: ", num);
  cb(num);
  }, 3000)
  setTimeout(function(){
  num = number + 2;
  console.log(cb);
  console.log("1 second has passed!!");
  console.log("number is now: ", num);
  cb(num);
  }, 1000)
  return num;
}

// The function within addTwo below (arg2) is the callback:

let numberReturned = addTwo(4, function(number){
  console.log("I got the number and it is ---> ", number);
)};

console.log("Number has been returned from fn: ", numberReturned );

// undefined will return first
//  it technically is running setTimeout fn first, but it is 'taking longer' so it comepletes the return before setTimeout has finished
```