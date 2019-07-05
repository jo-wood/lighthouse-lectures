# W6D3- WebSocket
---
## Summary

* with HTTP requests being one way from the client, can't send info to the client based on new updates to our server
* therefore the client would have to constantly ask if any updates which is a strain on server
* websockets are an API in the browser, they allow the client and server to have a back and forth communication (now upon http request, the websocket opens a new client that we can now send information to during their connection - so if any new info is added, we as teh server can update other clients with this new info in real time )
* chat systems are perfect for websockets - but making them robust is very challenging (when users drop off, runtimes, etc)

## SERVER side

npm install the packages of express and websocket (ws)

happening on the same server, same port, but the websocket almost like a sub-server that says, hey http server, when you get a request of 'connection' from a new client - I want to know.
* therefore the http server says, okay new client request that includes a websocket request (headers identifies) - so it knows to send this data from teh request over to the websocket

```javascript

const express = require('express');
const WsServer = require('ws').Server;

const app = express();

app.get('/', (req, res) => { 
  res.send('hello world');
  //res.sendFile(path.join(_dirname + index.hmtl));
});

const server = app.listen(8080, () => {
  console.log('server started');
});

const wsserver = new WsServer({ server });




let idToName = {};

const handlers = {
  greeting: (msg) => {
      console.log('msg:', msg.content);
  },
  setUsername: (msg, userId) => {
    idToName[userId] = msg.content;
  }
};

// this way connects to all the server objects, not just that specific socket server
WsServer.prototype.broadcast = function(msg) => {
  this.clients.forEach((c) => {
    c.send(JSON.stringify(msg));
  });
}

wsserver.on('connection', (client/*, req*/) => {

  console.log('new client: ', client);
  const userId = Math.random();
  idToName[userId] = 'Anonymous';
  client.userId = userId;
// could use this to keep track of which client is where 
// so selective changes to who i send what to 
// const users_to_sockets = {};

  console.log('new client', req);
  // uesrs_to_sockets[req.session.user_id].append.....
  // could use req to do user auth, associate this `client`
  // object/channel/socket with a particular user


  client.on('message', (msgData) => {
    //since the connect created a closure with this inside, we can keep track of who that specific new client was, and when they send more information I'll know who was sending it relative to this session
    console.log(`message from client: ${userId}: ${msgData}`)
    //to store say any changes to userName in our chattyApp
    const msg = JSON.parse(msgData);
    handlers[msg.type](msg, userId);
  });

  //! then broadcast this new info: 
  // since we set up outside of the connection changed the below:
// wsserver.clients.forEach(c => {
//   c.send('new user joined');
// });

//! OR do so by passing outside: 

  wsserver.broadcast('new user joined');


  client.on('close', () => {
    console.log('client left');
    delete idToName[userId];
    //good when managing state to log out
  })

});

```



## CLIENT side

```html

<body> 
  <h1>Hello</h1>
  <div id='messages'></div>
  <script>
  //the client side is opening a request to the websocket
    const socket = new WebSocket(
      location.origin.replace(/^https(s)?/, '/ws$1')
    );
    let isOpened = false;
    const sendMsg = (msg) => {
      if (isOpened) {
        socket.send(JSON.stringify(msg));
      } else {
        // handle error or add to queue?
      }
    }
    // need to wait until the connection is actually made before we can send anything to the websocket
    socket.addEventListener('open', () => {
      isOpened = true;
      console.log('websocket open ')
      sendMsg({content: 'hello ? server? '})
    });

    // now this will get called anytime the server sends something to the client 
    socket.addEventListener('message', (msg) => {
      document.getElementById('messages').appendChild(
        document.createTextNode(msg.data)
      );
    });
    socket.addEventListener('close', () => {
      console.log('server went away');
    });
  </script>
</body>

```

Notes on chatty:

```javascript
//component did moutn 

//this.setState({closed: false})



gotMsg(msg) {


  //handle msg
  this.setState((oldState) => {
    return {msgs: this.state.msgs.concat.}
  })
}

```