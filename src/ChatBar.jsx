import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    return (
    <footer className="chatbar">
      <input onKeyUp={this.props.handleNewUserName}className="chatbar-username" defaultValue={this.props.currentuser} placeholder="Type a name and hit ENTER" />
      <input onKeyUp={this.props.handleKeyPress} className="chatbar-message" placeholder="Type a message and hit ENTER" />
    </footer>
    );
  }
}

export default ChatBar;
