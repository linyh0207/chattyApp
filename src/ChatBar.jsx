import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    
    return (
    <footer className="chatbar">
      <input onKeyUp={this.props.enterNewUserName}className="chatbar-username" defaultValue={this.props.currentuser} />
      <input onKeyUp={this.props.handleKeyPress} className="chatbar-message" placeholder="Type a message and hit ENTER" />
    </footer>
    );
  }
}

export default ChatBar;
