import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './notification.jsx';

class MessageList extends Component {
  render() {
    var messageList = this.props.messages.map(message => {
      if(message.type === 'incomingNotification'){
        return <Notification key={message.id} singleNotice={message}/>
      } else {
      return <Message key={message.id} singleMessage={message}/>
      }
    });
    return (
      <main className="messages">
      <ul>{messageList}</ul>
      </main>
    );
  }
}

export default MessageList;
