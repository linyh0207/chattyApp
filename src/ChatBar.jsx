import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    
    return (
    <footer className="chatbar">
      <input className="chatbar-username" placeholder= {this.props.currentuser.name}/>
      <input onKeyUp={this.props.handleKeyPress} className="chatbar-message" placeholder="Type a message and hit ENTER" />
    </footer>
    );
  }
}

export default ChatBar;
