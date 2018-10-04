import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

export default class App extends Component {
  constructor (){
    super();
    this.socket = new WebSocket('ws://localhost:3001/');
    this.state = {
        data: {
          currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
          messages: [],
          totalUsers: ""
        }
    };
    this.handleNewUserName = this.handleNewUserName.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    
  }
 
  componentDidMount() {
    this.socket.onopen = function() {
      console.log('Connected to server');
    }
  
    this.socket.onmessage = this.handleMessage

  }



  handleMessage(event) {
    const newMessage = JSON.parse(event.data);
    switch(newMessage.type){
      case "incomingMessage":
      case "incomingNotification":
      let messages = this.state.data.messages.concat(newMessage);
      this.setState((prevState) => {
        Object.assign(prevState.data, {messages})
      });
      break;

      case "userNumbers":
      const totalNum = newMessage.totalUsers;
      console.log(totalNum);
      this.setState((prevState) => {
        Object.assign(prevState.data, {totalUsers: totalNum})
      });
      break;
    }

    // const messages = this.state.data.messages.concat(newMessage);
    // this.setState((prevState) => {
    //   Object.assign(prevState.data, {messages})
    // });
    // console.log("handleMessage",this.state.data);
  }

  handleKeyPress = evt => {
    let input = evt.target.value;
    if(evt.keyCode === 13){
      var jsonPost = JSON.stringify ({type: 'postMessage', username: this.state.data.currentUser.name, content: input});
      this.socket.send(jsonPost);
      evt.target.value ="";
    }
  }

  handleNewUserName = evt => {
    if(evt.keyCode === 13){
      let newName = evt.target.value;
      let jsonNotice = JSON.stringify ({type: 'postNotification', content: `${this.state.data.currentUser.name} has changed their name to ${newName}`});
      this.socket.send(jsonNotice);
      console.log(jsonNotice);
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
      <div className="navbar-totalUser">{this.state.data.totalUsers} users online</div>
    </nav>
     <MessageList messages={this.state.data.messages}/>
    <ChatBar currentuser={this.state.data.currentUser.name} handleKeyPress={this.handleKeyPress} handleNewUserName={this.handleNewUserName}/>
    </div>
    );
  }
}
