# W6D5 - Lecture

## quick notes on prototypes

Warning - should have a really good reason for needing to use prototypes. Breaks happen across the internet when libraries set the prototypes and change the defaults of important prototypes through overwriting etc

* `let foo = '123'`
* `foo.__proto__` erturns a `String{}` object with constructor etc info
* therefore can make our own prototype
* `function Person ({name, age}) {this.name = name, this.age = age}`
  * `Person `
* `alex.__proto__`
* Person.prototype.greet = function () { log ('hey my name is ${this.name})}
* `alex.() and alex.greet()`
* ` class Developer extends Person { constructor(values) { super(values)}}
  * ` this.lang = values.lang` 
  * method within the class `beFunny() { console.log ('joke')}`
* now have the old school and new school way of creating a class
* let alex = new Person({name, age})
  * this needed to have the Person pass an object so that we can have multiple values/ (when passing the super (values) this allows each instance to use those predfined props and methods)

---
## create-react-app

* example on any reddit page add .json to the end 
* within App component
* (within browser DevTools > Network, can see that the response will send an object with prop of data and children within that)
  * therefore the `res` below is the returned json response from the fetch, and parsing it using `.json()` is a promise

```javascript
 
impost './App.css';


class ImageSearch extends React.Component {

  state = {
    images: [],
    query: 'dogs',
    loading: false
  }

componentDidMount() {
  this.fetchImages();
}


fetchImages() {
  this.setState({loading:true})
  // fetch('https://www.reddit.com/r/aww.json')
  fetch(`https://www.reddit.com/r/aww/search.json/?=${this.state.query}&restrict_sr=1`)
    .then(res => res.json())
    .then(json => {
      this.setState({
        images: json.data.children.map(child => child.data)
        loading: false
        })
    })
}

render() {
  return (
    <>
      <h1> search for stuff {this.state.loading && '...loading...'}</h1>
      <input
        value={this.state.query}
        onChange={event => {
          this.setState({query:event.target.value},
          this.fetchImages)
        }}
      />
      <hr />
      {this.state.images.map(img => {
        <img key={img.id} src={img.thumbnail} />
      })}
    </>
  )
}
}
```

* the above is how we have so far been familiar
* now improve the modularity
* the problem with the below is we didn't actually seperate anything that can now be easily removed and used someone else (we basically just glued it to another dependency)

```javascript
 
impost './App.css';


class ImageSearch extends React.Component {

  state = {
    images: [],
    query: 'dogs',
    loading: false
  }

componentDidMount() {
  this.fetchImages();
}

//* everything in here would be this.props now
function ImageSearchPresentation () {
fetchImages() {
  this.setState({loading:true})
  // fetch('https://www.reddit.com/r/aww.json')
  fetch(`https://www.reddit.com/r/aww/search.json/?=${this.state.query}&restrict_sr=1`)
    .then(res => res.json())
    .then(json => {
      this.setState({
        images: json.data.children.map(child => child.data)
        loading: false
        })
    })
}

render() {
  return (
    <>
      <h1> search for stuff {this.state.loading && '...loading...'}</h1>
      <input
        value={this.state.query}
        onChange={event => {
          this.setState({query:event.target.value},
          this.fetchImages)
        }}
      />
      <hr />
      {this.state.images.map(img => {
        <img key={img.id} src={img.thumbnail} />
      })}
    </>
  )
}
}



render() {
  return (
    <ImageSearchPresentation
      loading={this.state.loading}
      query={this.state.query}
      images={this.state.images}
    />
  )
}

}
```

* a way to modularize:
* this shows that the values getting passed into the presentation component are developer specific, don't need to have it linked
* `render props` docs explain all of this
* `higherOrderComponents` the same

```javascript

// from the App, ImageSearch, and ImgSearchPresentation Comps: 
// within the ImgSearchPresentation - decontruct the props in args
// and render/return would return the this.props.children within 
// the ImageSearch Comp

// but how do we get our props back up from the inner most nested 

// one option: but old and no one really doesn't use this
// render() {
//   return (
//     React.Children.map(this.props.children,
//     child => React.cloneElement(child, {
//       images: this.state.images,
//       query: this.state.query
//       // etc.
//     }))
//   )
// }

render() {
  //see <Example> comp and function to explain
  return (
    this.props.children({
      images: this.state.images, 
      query: this.state.query
    })
  )
}

// can return any valid js EXPRESSION
// therefore function is a valid expression

function Example(props) {

  return props.children('Alex')
  // instead of render actually already a method for this
  //  return props.render()
  // return props.foo('Alex')
  // return props.children()
}

function App() {
  return (
    // <> 
      //  <Example
      //   foo={() => 'show me my content!!!' + value}
      // />
    // <Example>
    //   {value => 'my name is ' + value}
    // </Example>

      <ImageSearch>
        <ImageSearchPresentation  {...values}/>
      </ImageSearch>
    // </>
  )
}

```

* still even better ways than this
* don't use `class` but not react

```javascript

function ImageSearch(props) {
  const state = { 
    loading: false, 
    images: [], 
    query: 'owl'
  };
}

// but what is the state necessarily since React did that for us
let setState = () => {}

const fetchImages = () => {
  setState({ loading: true })
  // ... etc
  // no this anymore, no render anymore 
}


const ImageSearchPresentation = () => {
  return props.children({
    images: state.images,
    query: state.query
  })
}

```

* with hooks (concentrating on components not state management yet!)
  * this involves having a store of all the states and using context to link that store to react (because react is whats providing context, and somethign like redux is the store but is not establishing context - somethign like connect that makes sure the context is passed onto redux) * redux just came out with their hooks version 
* don't want you to write DOM directly
* but you need to handle things when info is mounting or unmounting
* `effects` - we have code that we know what it does, and we say to the DOM to go do something, and the something that the DOM does is an `effect` such as the fetch to the api - see 2 examples down

```javascript

// using the above modifications removing class

function ImageSearch(props) {
  const [state, setState] = useState({
    loading: false, 
    images: [], 
    query: 'owl'
  });

  const fetchImages = () => {
    setState({ loading: true})

    fetch(
      /...
    )
    .then (
      setState(prev => {
        return {
          ...prev,
          images: json.data.children.map(child => ...)
        }
      })
    )
  }


// NOTE THIS SYNTAX: 
// setState(s => ({...s, query: value}));

  return props.children({
    images: state.images, 
    query: state.query
    // etc
  })


}

```

```javascript
import {useState, useEffect} from React 


useEffect(() => {
  fetchImages()
}, [state.query])

// syntax also works: 
useEffect(fetchImages, [state.query]);

// the array argument says we are giving it data to run the function and should that data change it will rerun, therefore we don't need to make our code call or invoke functions based on certain DOM effects, it will determine whether or not the data getting passed to that method has changed from the last pass of data

```

* updating and refactoring with hooks
* now we have a function that has all these properties
* and anyone can use it to put their own values in
* and get their own values out of it and the readability of this 
* puts us back into the liquid syntax that are fundamentally basic to js perspective when reading

```javascript

function ImgSearchPres() {
  // on return use setImage (instead of setState)

}

function useImageSearch(props) {
  // the first is what the state item would be
  // the second argument is as if re-setting the state
  // but now it will re-render if the state changes without needing
  // to keep this as class
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [query, setQuery] 

const fetchImages = () => {
  setLoading(true);
  fetch(
    `...${query}`
  )
  //... 

  useEffect(fetchImages, [query])

// use HOOKS to return the 'state' to the 'children' to replace this part
  // return props.children({
  //   images, 
  //   query, 
  })

  return {
    images, 
    query, 
    setQuery
  }
}

}

function App() {
  let values = useImageSearch();

  // dont really even need the ImgSearchComp anymore, just copy that logic
  // into this app function and then add values. infront of any of what 
  // were the passed props
  return <ImgSearchPres {...values} />
}

```