import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

export default class App extends Component {
  constructor (){
    super();

    this.state = {
        data: {
        currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [
          {
            id: "1",
            username: "Bob",
            content: "Has anyone seen my marbles?",
          },
          {
            id: "2",
            username: "Anonymous",
            content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
          }
        ]
      }
    }
  }
  render() {
    return (
    <div>
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
    </nav>
     <MessageList messages={this.state.data.messages}/>
    <ChatBar currentUser={this.state.data.currentUser}/>
    </div>
    );
  }
}

