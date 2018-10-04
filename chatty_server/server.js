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

// const clients =[];
wss.on('connection', (ws) => {
  console.log('Client connected');
  

  // var json = JSON.stringify({ message: 'Gotcha' });
  //     ws.send(json);
  // clients.push(ws);

  ws.on('message', function(message) {
  var jsonParseInput = JSON.parse(message);
  var sendMsg = {id:uuid(), username: jsonParseInput.username, content: jsonParseInput.content}
  console.log(sendMsg);
  
  wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(sendMsg));
    });
  });



  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});