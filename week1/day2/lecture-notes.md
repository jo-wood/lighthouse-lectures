# Advent of Code Challenge:

[jump to star 2 notes](#star-2)...

## Star 1

[Summary of problem part 1](https://adventofcode.com/2018/day/1)

### Initial Review of Problem & Questions

- what are the limits to the frequency inputs (how many can be input)
  - this shouldn't matter if just loop through the length of the input?
- how do we process our input
- how do we store the input before processing
  - how do we iterate through the input
- input doesn't have units therefore just numbers
- how do we parse a string with plus sign?

### fs documentation from node:

- fs.readFileSync
- index.js:

```javascript
var fs = require('fs');
var input = fs.readFileSync('./input.txt').toString();

console.log(input);
```

- want to make sure that the text content of the file is converted to a string
- this helps eliminate the *buffer* added to the resulting input variable
- now add a smaller test set of numbers
- make sure account for the new lines that the string uses to seperate the numbers

```javascript
var numbers = input.split('\n');
```

- note in order to parse through the + sign, do quick REPL test `parseInt('+10', 10)` and will see that the result are correct for the sign both `(+)` & `(-)`
- use for loop to interate through

```javascript
for (var numStr of numbersStrings){
  numberArray.push(parseInt(numStr, 10));
}

//check if type is correct
console.log(typeof numberArray[8]);
```
- note the test case of of random indexes within the new array of numbers to ensure their type is correctly changed


Now loop through to total the values (not efficient, should keep in original loop but this is for learning)

- will see an error in termnal of `NaN`

```javascript
var fs = require('fs'),
    input = fs.readFileSync('./input.txt').toString(),
    numbersStrings = input.split('\n'),
    numberArray = [],
    total = 0;

for (var numStr of numbersStrings){
  numberArray.push(parseInt(numStr, 10));
}

for (var num of numberArray) {
  total += num;
}

console.log(typeof total);
```
- google, node + how to check if a value is NaN
- MDN `isNaN()` since `NaN === NaN` will return false (even though it is a numeric data type, it is undefined as a real number)

- use debugger
```javascript
if(!isNaN(number)){
  debugger;
}
```

Therefore change first loop to ignore any instances where we are passing a NaN

```javascript
for (var numStr of numbersStrings){
  var number = parseInt(numStr, 10);

  if(!isNaN(number)){
    numberArray.push(number);
  }
}
```

Improve the efficiency - an O(n) sln without using 2 loops would allow faster resolve. Within our `!isNaN` we are already holding the number, therefore instead of pushing into an array just start combining it to the total.

var fs = require('fs'),
    input = fs.readFileSync('./input.txt').toString(),
    numbersStrings = input.split('\n'),
    total = 0;
```javascript
for (var numStr of numbersStrings){
  var number = parseInt(numStr, 10);

  if(!isNaN(number)){
      total += number;
  }
}

console.log(total);
```

## Star 2

[Summary of problem part 2](https://adventofcode.com/2018/day/1#part2)
