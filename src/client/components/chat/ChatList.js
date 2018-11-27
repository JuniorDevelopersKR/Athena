import React, { Component } from "react"
import ChatInfo from "./ChatInfo"

class ChatList extends Component {
  static defaultProps = {
    data: []
  }

  render() {
    const data = this.props.info
    const list = data.map(info => (
      <ChatInfo info={info} userid={this.props.userid} />
    ))
    console.log(data + "ChatList")
    return <div>{list}</div>
  }
}

export default ChatList
