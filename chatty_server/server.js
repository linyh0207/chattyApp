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
  const colors = ['red', 'green', 'blue', 'orange'];
  const userColor  = colors[Math.floor(Math.random() * colors.length)]


  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify({type: 'userNumbers', totalUsers: wss.clients.size}))
    console.log('Client connected', wss.clients.size)
  });

  ws.on('message', function(message) {

  let jsonMessage = JSON.parse(message);
    switch(jsonMessage.type){
      case "postMessage":
      console.log(jsonMessage.content);

      if (jsonMessage.content[0] === '/'){
        const parts = jsonMessage.content.split(' ');
        console.log("parts", parts)
        const cmd = parts[0].replace('/', '');
        console.log("cmd", cmd)
        switch (cmd){
          case 'hamster':
          let hamsterImg = "https://media.giphy.com/media/7oUdj7cAkXVfi/giphy.gif"
          let sendImg = {type: 'incomingImg', id:uuid(), color: userColor, username: jsonMessage.username, content: hamsterImg}
          console.log(sendImg);
          wss.clients.forEach(function each(client) {
            client.send(JSON.stringify(sendImg));
          });
        }
      } else {

      let sendMsg = {type: 'incomingMessage', id:uuid(), color: userColor, username: jsonMessage.username, content: jsonMessage.content}
      console.log(sendMsg);
      wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(sendMsg));
      });
    }
      break;

      case "postNotification":
      let sendNotice = {type: 'incomingNotification', id:uuid(), content: jsonMessage.content}
      console.log("sendNotice", sendNotice);
      wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(sendNotice));
      });
      break;
      // default:
      // throw new Error("Unknown event type " + data.type);
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify({type: 'userNumbers', totalUsers: wss.clients.size}))
      console.log('Client disconneted', wss.clients.size)
    });
  });
});