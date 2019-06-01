# W1D3 Notes:

- don't forget type-coercion is occuring in the case of comparing a primitive value to a primitive constructor (object) are not the same data types: 

```javascript
var greeting = "Hello, world!" 
var otherGreeting = new String("Hello, world!");

greeting == otherGreeting; 
// => true

greeting === otherGreeting; 
// => false
```