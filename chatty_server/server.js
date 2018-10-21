// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  const colors = ['#CD5C5C', '#9DC183', '#E0CC77', '#5F4B8B'];
  const userColor  = colors[Math.floor(Math.random() * colors.length)]

  //Broadcast the updated total clients numbers when a new client connected
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify({type: 'userNumbers', totalUsers: wss.clients.size}))
    console.log('Client connected', wss.clients.size)
  });

  ws.on('message', function(message) {
  let jsonMessage = JSON.parse(message);

    switch(jsonMessage.type){
      //User enter content and press enter at the content input field
      case "postMessage":
      //If user type "/hamster", it will return a hamster gif
      if (jsonMessage.content[0] === '/'){
        const parts = jsonMessage.content.split(' ');
        const cmd = parts[0].replace('/', '');
        switch (cmd){
          case 'hamster':
          let hamsterImg = "https://media.giphy.com/media/7oUdj7cAkXVfi/giphy.gif"
          let sendImg = {type: 'incomingImg', id:uuid(), color: userColor, username: jsonMessage.username, content: hamsterImg}
          wss.clients.forEach(function each(client) {
            client.send(JSON.stringify(sendImg));
          });
        }
      //Rest of the input
      } else {
      let sendMsg = {type: 'incomingMessage', id:uuid(), color: userColor, username: jsonMessage.username, content: jsonMessage.content}
      wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(sendMsg));
      });
    }
      break;
      //User enter new username and press enter at the username input field
      case "postNotification":
      let sendNotice = {type: 'incomingNotification', id:uuid(), content: jsonMessage.content}
      wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(sendNotice));
      });
      break;
      default:
      throw new Error("Unknown event type " + data.type);
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  // Broadcast the updated total clients numbers when a client disconnected
  ws.on('close', () => {
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify({type: 'userNumbers', totalUsers: wss.clients.size}))
      console.log('Client disconneted', wss.clients.size)
    });
  });
});