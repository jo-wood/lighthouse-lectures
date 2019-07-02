# W6D1

## React

Topics:

* States
* Props
* Conditionals

### State

* main defining purpose is to re-render the *changing* data
  * if wanted counter just using a scoped variable then don't need to use state
  * but want to change UI with this change in data, then state

### Props

* remember that it's what was passed, which would likely be state or functions from parent comps

```javascript
// this.props.count vs. this.state.count;
```

if the function is called ie `gretting` but passed as a prop as `greeting={this.gretting}` this will still work and not matter because the comp taking in the props is calling this function props: {greeting: function f...}

* what if need to pass a value to the function thats passing as a prop
* therefore use the function that we passed in (we passed a REFERENCE to this function) - therefore i can return `this.props.greeting('vasiliy')`
  * then this function that we return the greeting within, call this.functionName within our 'external' component render(). 

**USE this below to help trouble shoot convuluted components to track either events or this or anything currently within the browser console log - easy to play with here;

```javascript
handleName = () => {
  debugger;
  this.props.greeting('vasiliy');
}
```

* NOTE: hooks is going to end up replacing the constructor entirely

### Conditionals

* note, saying `=== 5` below will cause an error as its coercing the type to a string? - if use this countional outside of the return it works, but here it's not?

```javascript
return (
  <div>
    { (this.state.counter >= 5) && (
      <div>
        Count is finally 5!
      </div>
    )
  </div>
)
```