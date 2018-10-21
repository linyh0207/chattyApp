import React, {Component} from 'react';

class Message extends Component {
  render() {
    return(
    <div className="message">
    <span style= {{color: `${this.props.singleMessage.color}`}} className="message-username">{this.props.singleMessage.username}</span>
    <div className="message-content" style= {{color: `${this.props.singleMessage.color}`}}>{this.props.singleMessage.content}</div>
    </div>
    );
  }
}

export default Message;
