import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './notification.jsx';
import Img from './img.jsx';

class MessageList extends Component {
  render() {
    var messageList = this.props.messages.map(message => {
      console.log("singleMessage",message)
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



      // if(message.type === 'incomingNotification'){
      //   return <Notification key={message.id} singleNotice={message}/>
      // } else {
      // return <Message key={message.id} singleMessage={message}/>
      // }
    });
    return (
      <main className="messages">
      {messageList}
      </main>
    );
  }
}

export default MessageList;
