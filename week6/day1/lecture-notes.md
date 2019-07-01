# Week 6 - Day 1 Lecture

**Class updates**

* Chatty App project
* first 3 days building the FE with React
* then server will be built afterward seperately 

* usually just use a boilerplate, but check webpack doc if want to make more of its functionality

* 12  week program making a different project than chatty
* (chatty good because teaching websockets)

---

## REACT

* DON'T forget to wrap your returned JSX into a nested element
* To use logic, must use `{}` within the returned JSX
* can declare a variable outside of class that returns JSX, then run the method in `{}` inside your return on render()
* THIS RETURN needs to also be wrapped within another element!

* From example with reddit meme page
  * when returning html with class don't forget to use `className`
  * move the img & title rendering into a method that gets called
  as many times as need to within class render - therefore can change what inputs for each are used (when trying to repeat the functionality of an existing component)
  * this way can also use an array to feed the inputs

* two ways to print an array (that is holding objects) (since react will only render simple arrays, not ones with objects) 
  *  1st way (not preferred, but shows reason) - can store html inside of the array because of JSX
  * within render(), create a new empty array, and use for loop here (since can't put directly in JSX), and can newArr.push(<h1>{i}</h1>) - then in the return statement return (<div> {newArr}</div>)

  * **better way is to use map()**
  * this map below would return an array of undefined in each index because it always returns an array of the same size;

```javacsript
let value = x.map(value => {
      //nothing here
});
```

``javascript
let valArr = x.map(val => {
  return <h1>{val)</h1>

});
```

* and this works within the return too!! don't technically need to the value
* (this is okay when returning something simple within one line - move to variable if dense)

``javascript
return (
  <div>
  { 
    x.map(val => { return <h1>{val)</h1>});
  }
  </div>
) 
```
* then 

```javascript
const videos = (url, title) => {

}

render() {
  return (
    <div>
      {array.map(val => {
        return videos(val.imgSrc, val.title);
      })}
    </div>
  )
}
```

* when in class, don't need to say const videos = ;
* can just use videos = inside class
* arrow functions automatically bind within the class 
* therefore don't need to use the bind(this) inside the constructor 

### Rule 1:

* Always import React

```javascript
import React, {Component} from 'react';
```

### Rule 2:

* Make class ______ and it MUST extend component

```javascript
class App extends Component {}
```

### Rule 3:

* Always export your component

```javascript
export default App;
```

### Rule 4:

* Your class MUST have a render function

```javascript
render() {}
```

### Rule 5:

* Must return back JSX

```javascript
return (<h1>JSX</h1>)
```
