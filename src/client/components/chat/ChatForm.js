import * as React from "react"
import "./ChatForm.css"

class ChatForm extends React.Component {
  state = { messageContent: "" }

  constructor(props) {
    super(props)
  }

  setMessageContent = messageContent => {
    this.setState({
      messageContent: messageContent
    })
    this.props.setMessageContent(messageContent)
  }
  submit = e => {
    e.preventDefault()
    // const messageContent = this.state.messageContent
    this.props.submit(e)
    this.setState({
      messageContent: ""
    })

    console.log("submit")
  }

  render() {
    let submitContent
    if (this.state.messageContent) {
      submitContent = (
        <div>
          <input type="submit" value="메세지 전송" />
        </div>
      )
    } else {
      submitContent = (
        <div>
          <input type="submit" value="메시지를 입력하세요" disabled="true" />
        </div>
      )
    }
    return (
      <div className="Chat--Button">
        <form onSubmit={this.submit}>
          <input
            type="text"
            placeholder="메세지를 입력하세요."
            value={this.state.messageContent}
            onChange={e => this.setMessageContent(e.target.value)}
          />
          {submitContent}
        </form>
      </div>
    )
  }
}
export default ChatForm
