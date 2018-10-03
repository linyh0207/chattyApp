import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const generateRandomId = (alphabet => {
  const alphabetLength = alphabet.length;
  const randoIter = (key, n) => {
    if (n === 0) {
      return key;
    }
    const randoIndex = Math.floor(Math.random() * alphabetLength);
    const randoLetter = alphabet[randoIndex];
    return randoIter(key + randoLetter, n - 1);
  };
  return () => randoIter("", 10);
})("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");


export default class App extends Component {
  constructor (){
    super();
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = {
        data: {
          currentUser: {name: "Angela"}, // optional. if currentUser is not defined, it means the user is Anonymous
          messages: [
            {
              id: generateRandomId(),
              username: "Bob",
              content: "Has anyone seen my marbles?",
            },
            {
              id: generateRandomId(),
              username: "Anonymous",
              content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
            }
          ]

        }
      }
    this.socket = new WebSocket('ws://localhost:3001/');
  }
  componentDidMount() {
    this.socket.onopen = function() {
      console.log('Connected to server');
    }

    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = {
        id: generateRandomId(), 
        username: "Michelle", 
        content: "Hello there!"
      };
      const messages = this.state.data.messages.concat(newMessage)
      this.setState((prevState) => {
        Object.assign(prevState.data, {messages})
      });
      console.log(this.state)
    }, 3000);
  }

  


  
  handleKeyPress = evt => {
    let input = evt.target.value;
    if(evt.keyCode === 13){
      const newMessage = {id: generateRandomId(), username: this.state.data.currentUser.name, content: input};
      const messages = this.state.data.messages.concat(newMessage)
      this.setState((prevState) => {
        Object.assign(prevState.data, {messages})
      });
      evt.target.value ="";
    }
  }
                      

  render() {

    return (
    <div>
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
    </nav>
     <MessageList messages={this.state.data.messages}/>
    <ChatBar currentuser={this.state.data.currentUser} handleKeyPress={this.handleKeyPress}/>
    </div>
    );
  }
}
