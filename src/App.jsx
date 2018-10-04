import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

// const generateRandomId = (alphabet => {
//   const alphabetLength = alphabet.length;
//   const randoIter = (key, n) => {
//     if (n === 0) {
//       return key;
//     }
//     const randoIndex = Math.floor(Math.random() * alphabetLength);
//     const randoLetter = alphabet[randoIndex];
//     return randoIter(key + randoLetter, n - 1);
//   };
//   return () => randoIter("", 10);
// })("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");


export default class App extends Component {
  constructor (){
    super();
    
    this.socket = new WebSocket('ws://localhost:3001/');
    this.state = {
        data: {
          currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
          messages: []
        }
    };
    this.enterNewUserName = this.enterNewUserName.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    
  }



  handleMessage(event) {
    const newMessage = JSON.parse(event.data);
    const messages = this.state.data.messages.concat(newMessage);
    this.setState((prevState) => {
      Object.assign(prevState.data, {messages})
    });

  }
  
  componentDidMount() {
    this.socket.onopen = function() {
      console.log('Connected to server');
    }
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      this.socket.onmessage = this.handleMessage
    }, 500)
  
  }

  
  handleKeyPress = evt => {
    let input = evt.target.value;
    if(evt.keyCode === 13){
      var jsonInput = JSON.stringify ({username: this.state.data.currentUser.name, content: input});
      this.socket.send(jsonInput);
      evt.target.value ="";
    }
  }


  enterNewUserName = evt => {
    if(evt.keyCode === 13){
      let newName = evt.target.value;
      this.setState((prevState) => {
        Object.assign(prevState.data.currentUser, {name: newName})
      });
    }
  }
                      

  render() {

    return (
    <div>
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
    </nav>
     <MessageList messages={this.state.data.messages}/>
    <ChatBar currentuser={this.state.data.currentUser.name} handleKeyPress={this.handleKeyPress} enterNewUserName={this.enterNewUserName}/>
    </div>
    );
  }
}
