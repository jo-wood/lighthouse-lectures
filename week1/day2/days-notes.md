# Notes from Today

- [jump to scope](#regarding-scope)
- [jump to error messages](#error-messages)
General:

- trouble-shooting, use console.log throughout code in order to start breaking the issues down (what IS working?). Then tackle what's not step by step.
- **truthy/falsey**
  - The following will execute as the if solves to *true*.
  ```JavaScript
      shoppingList = [];

    if (!shoppingList.length) {
    shoppingList.push('coconut milk');
    }
  ```
---
### Regarding Scope


If the inner declaration of a used the syntax of var, the alert would read '4' not the global value of '1'.

```javascript
var a = 1;

function one() {
  if (true) {
    let a = 4;
  }

  alert(a); // alerts '1' because the 'let' keyword uses block scoping
}
```

Consider **object properties**:

```javascript
var a = 1;

function Five() {
  this.a = 5;
}

alert(new Five().a); // alerts '5'
```

Consider **closure**

```javascript
var a = 1;

var six = (function() {
  var a = 6;

  return function() {
    // JavaScript "closure" means I have access to 'a' in here,
    // because it is defined in the function in which I was defined.
    alert(a); // alerts '6'
  };
})();
```

Consider **prototype-based scope resolution**

```javascript
var a = 1;

function seven() {
  this.a = 7;
}

// [object].prototype.property loses to
// [object].property in the lookup chain. For example...

// Won't get reached, because 'a' is set in the constructor above.
seven.prototype.a = -1;

// Will get reached, even though 'b' is NOT set in the constructor.
seven.prototype.b = 8;

alert(new seven().a); // alerts '7'
alert(new seven().b); // alerts '8'
```

#### Tricks to watch out for:
 - the below will print out undefined and 10 rather than 5 and 10

```javascript
var x = 5;

(function () {
    console.log(x);
    var x = 10;
    console.log(x);
})();
```
this is because js always moves variable declarations (not initializations) to the top of the scope, making the code equivalent to:

```javascript
var x = 5;

(function () {
    var x;
    console.log(x);
    x = 10;
    console.log(x);
})();
```

#### Extra tricky:

**catch clause-scoped variable**

This will print out 5, 6, 5. Inside the catch clause e shadows global and local variables. But this special scope is only for the caught variable. If you write var f; inside the catch clause, then it's exactly the same as if you had defined it before or after the try-catch block.

```javascript
var e = 5;
console.log(e);
try {
    throw 6;
} catch (e) {
    console.log(e);
}
console.log(e);
```
---
### Error messages


**Unexpected token )**

 SyntaxError: Unexpected token ) is a big hint. Unexpected token errors occur when JavaScript expected something that wasn't there, which frequently means we're missing a parenthesis, bracket or curly brace. In our case, we're missing a }.
*** it may seem as though the pointed out syntax doesn't even seem to occur in our code ***
