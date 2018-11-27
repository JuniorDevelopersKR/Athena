import React, { Fragment } from "react"
import "./ChatInfo.css"

class ChatInfo extends React.Component {
  state = {
    content: "",
    username: ""
  }

  render() {
    const { userId, username, message, time } = this.props.info
    let messageContent
    //자신이 보낸메시지 일 경우 오른쪽으로 정렬해줘야돼
    if (userId === this.props.userid) {
      messageContent = (
        <Fragment>
          <div className="owner">
            {time} {message} : {username}
          </div>
          <br />
        </Fragment>
      )
    }
    //다른사람이 보낸 메시지 일 경우 왼쪽으로 정렬해줘야돼
    else {
      messageContent = (
        <Fragment>
          <div className="people">
            {username} : {message} {time}
          </div>
          <br />
        </Fragment>
      )
    }

    return <Fragment>{messageContent}</Fragment>
  }
}

export default ChatInfo
