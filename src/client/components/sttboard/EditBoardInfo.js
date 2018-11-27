import axios from "axios"
import React, { Fragment } from "react"
import "./EditBoardInfo.css"

class EditBoardInfo extends React.Component {
  state = {
    content: "",
    key: "",
    startSecond: ""
  }
  componentDidMount = () => {
    this.setState({
      content: this.props.info.content,
      key: this.props.info.key,
      startSecond: this.props.info.startSecond
    })
  }
  onChange = e => {
    this.setState({
      content: e
    })
    console.log(this.state.content + "ㅁㄴㅇㄻㄴㅇㄹ")
    this.props.changeContent(this.state.key, e)
  }

  play = () => {
    this.props.setPlaySec(this.state.startSecond)
  }

  render() {
    console.log(this.props.info.content, this.props.info.key + "내용 로그")
    return (
      <div>
        <button className="playbutton" onClick={this.play}>
          {" "}
          <div className="font">▶</div>{" "}
        </button>
        <input
          className="fix--text"
          type="textarea"
          value={this.state.content}
          onChange={e => this.onChange(e.target.value)}
        />
      </div>
    )
  }
}

export default EditBoardInfo
