import React, {Component} from 'react';

class Img extends Component {
  render() {
    return(
  <div className="message">
  <span style= {{color: `${this.props.singleImg.color}`}} className="message-username">{this.props.singleImg.username}</span>
  <span className="img-content"><img src={this.props.singleImg.content}/></span>
  </div>
    );
  }
}

export default Img;
