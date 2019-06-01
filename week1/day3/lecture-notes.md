# Lecture Notes Day 3

## Objects in JS

- objects have constant time lookup 
- whereas if value was in an array, would have to run through each step in the array in order to find the one looking for

**objects are a REFERENCE to the objects**

```javascript
function foo(a) {
  a = 10;

  var b = 20 ;
  foo(b);
}
```


```javascript
function bar(a){
  a = {};

  var object = {key: 'value'}
  
bar(object)
}
```

- but if we reference the object prop within by passing by reference as an argument within fn, this will change the object prop

```javascript
 function baz(a){
  a.key = "new value";
 }
```

```javascript
 function blah(){
   var object = { key: 'value'};
   baz(object);
 }
blah();
```
