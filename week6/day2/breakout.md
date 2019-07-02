# W6D2

REACT

*sidenote (debounce function) - if someone is typing but want to fire your function when so many seconds or somethign have passed (ie, send the input when they user is done type after x seconds)

## Organizing State

* see state-diagrams for flow when tree like components
* generally ends up moving state upward as other components require some of that changed data from other sibling component functions
* could also have components only having the state where that state is needed, but tends to be required in multiple areas
* good to have single source of truth, but can get message when passing multiple props to one comp and only a couple to some others or that one recieving many was to actually pass down
* there are options to clean this up in react, but also flux and store possibilites (keep state in a seperate global object)

## Controlled vs Uncontrolled Inputs

* the warning from react on the propType where the `value` prop to a form field, at end of value add `readOnly={true}` into the input prop
  * but likely want it to actually be able to edit

* **Controlled Input** = any value that is given a set (ie. this.state.value) and react controls it

* **Uncontrolled Input** = if a defaultValue was given not a set one / can use defaultValue which will be used in no this.state.value exists
  * this will not change on re-renders - only on first mount

* this allows the input to change (editable) - but doesn't mean the state was actually changed yet
* see `ref` prop below ( this is a React feature not html)
* using onChange could be used but might be more useful when want to change the state as the input is being changed per new character
  * `<input ref='query' onChange={ this.handleClick } defaultValue={this.state.value} />`
  * to the above could also just add `value={ this.state.value }` into the input and then on form onSubmit use the e.target.value to constantly update the state in the handler
  * in this case the refs wouldn't work as we are using the button to signal that we want to make a state change
* could also use the onSubmit method for the form, and catch the value by using e.target.elements.query.value (where `name='query'` in the input is specified) (and type on button was changed to submit)

```javascript

// App comp...

  constructor(props) {
    super(props);
    this.state = {
      value: 'blah';
    }
  };

  handleClick = e => {
    // don't need to use prevent if the button is of type='button'
    //e.preventDefault();
    this.setState({ value: this.refs.query.value})

  }

  render() {
    return (
      <form>
        <input ref='query'  defaultValue={this.state.value} />
        <button type='button'  onClick={() => }> Send </button>
      </form>
    );
  }
```

### tic-tac-toe

* notes from Rafal will also have the search-by-input example too

* example of how to approach the design of an app such as tic-tac-toe

1. What does the interface look like
2. What data is changing that I need to keep track of - easier to keep single source of truth that for when we have update our move, i don't need to have the other elements of state update and react aswell as a result of this move
  `{
    grid: [[null, null,'x'], [null, 'o', null], [null, null, null]],
    currentPlayer: 'x',  // best to have these as derived states in helper methods
    gameOver: null // best to have these as derived states in helper methods
   }`
3. What events are occuring to trigger the state changes

* playAt(pos) - this can tell me who went 
* reset() - this will change all the values
* NOTE: onClick events may trigger these functions, but the question is which 'events' will we need to handle in order to change the state from a planning/design perspective
