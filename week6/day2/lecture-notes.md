# Lecture W6D2 - React Continued

* from prop-types npm:
  * MyComponent.propTypes = {}
* if something such as undefined was getting passed, this would help notify us in development (logs the actual warnings if we rendered something we didn't correctly set)
  * also good because we don't need to take in the weird cases where `null` is actually a `typeof` `object`
  
```javascript
// in our counter comp:
import PropTypes from 'prop-types

Counter.PropTypes = {
  step: PropTyoes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.function.isRequired
};

```


* how to decide component that owns the state

  * such as a child having it's own state too (such as it's own counter, which could also need to go communicate to other comps too)
* passing data and behaviours as props

* handling user actions

* Hooks allow us to add state or lifecycle methods to functional components

* updated versions of node (perhaps different from our boilerplate specifically) will not keep divs that we have to wrap everything within when returning our render() - which is good because a bunch of unncesary divs would make our code verbose for no other value

## Data Flow in Chatty

* usually larger React apps will use a `flux` library like `redux` to store and manage application data

* lecture example:
  * seeing repeated functionality between a counter component where there is `_handleIncrement` and `_handleDecrement` therefore:
* note, we are holding state in our child component here:

```javascript

//from App comp...
render() {
  return (
    <div>
      <Counter />
      <Counter step={2} />
      <Counter step={5} max={50}/>
      <Counter step={10} min={0} max={100}/>
    </div>
  )
}

// Counter comp holds the state
// from render in return of Counter comp...

constructor(props) {
  super()
  this.state = {
    numberOfLikes: 54;
    numberOfLegs: 28
  }
}

render() {
  const step = this.props.step || 1;
  return (
    <div>
      <button onClick={this._handleChange(-1 * step)}>-</button>
      <span>{this.state.counter}</span>
      <button onClick={this._handleChange(1 * step)}>+</button>
    </div>
  );
}

_handleChange = delta => _e  => {
  const newValue = this.state.counter + delta;
  const { min, max } = this.props;
  // should really put the below through a unit test!
  if (
    (min === undefined && max === undefined) ||
    (min !== undefined && max === undefined && newValue >= min) ||
    (max !== undefined && min === undefined && newValue <= max) ||
    (min <= newValue && newValue <= max)  
  ) {
    this.setState({ counter: newValue })
  }


};

```


## State & Props

**chattyApp**

* for this app, instead of using a `flux` library, we will simplify and have the `App` component be the singe source of truth, and store the state.
* anytime the state changes, the `App` component will update by calling the `render()` method. **This will automatically make all its child components update**

* the app needs to keep track of: 
  * **messages:** a list of messages, where every message identifies the user who posted the message
  * **currentUser:** a name for the current user (optional)



## ES6 classes


## React vs. ReactDOM

## Component Lifecycle

* convention I like - within class, keep lifecycle methods above helper methods && using the `_` infront of method to highlight that its not from a library but self-written methods

* when making a change to state, want to change the counter value in lecture example: 

* change the javascript to pass the state to the render component through props

```javascript

// in app with state here now:
<Counter
   min={0}
   onChange={value => console.log("got a new value: ', value) }
   value={ this.state.numberOfLikes } />

// in Counter component...
  if (onChange) {
    onChange(newValue);
   }
 )
```

### constructor(`getInitalState` vs `this.state = {}`)

* this funtion will not run after initial, aka will not run on re-renders

### componentDidMount

### componentWillUnmount

### setState

* triggers the re-render
* helpful to keep the event inside our passed args of the helper functions even though not using right now (incase we want to remember that could use it down the line) - again can highlight it to understand not used right now by using `_e` 
