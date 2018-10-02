import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    var messageList = this.props.messages.map(message => {
      return <Message key={message.id} singleMessage={message}/>
    });
    return (
      <main className="messages">
      <ul>{messageList}</ul>
      </main>
    );
  }
}

export default MessageList;
