import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';
import Img from './Img.jsx';

class MessageList extends Component {
  render() {
    var messageList = this.props.messages.map(message => {
      switch(message.type){
        case 'incomingNotification':
        return <Notification key={message.id} singleNotice={message}/>
        break;

        case 'incomingMessage':
        return <Message key={message.id} singleMessage={message}/>
        break;

        case 'incomingImg':
        return <Img key={message.id} singleImg={message}/>
        break;
      }
    });
    return (
      <main className="messages">
      {messageList}
      </main>
    );
  }
}

export default MessageList;
