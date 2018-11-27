import { inject, observer } from "mobx-react"
import React, { Component, Fragment } from "react"
import axios from "axios"
import FileDownload from "js-file-download"

@inject("groupSelect")
@observer
class Stt extends Component {
  state = {
    boardId: "",
    contents: "",
    error: "",
    file: "",
    inputType: "audiofile",
    language: "en-US",
    progress: false
  }
  store = this.props.groupSelect
  constructor(props) {
    super(props)
  }
  handleSubmit = async e => {
    e.preventDefault()
    console.log("Clicked STT contents submit!")

    const formData = new FormData()
    formData.append("sampleFile", this.state.file)
    formData.append("inputType", this.state.inputType)
    formData.append("language", this.state.language)

    var a = 1
    const groupSelect = this.props.groupSelect
    this.props.setProgress()
    this.setState({
      progress: !this.state.progress
    })
    // console.log(JSON.stringify(groupSelect))
    await axios({
      data: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      },
      method: "POST",
      url: "https://www.lecturesharing.com:8080/groups/" + groupSelect + "/stt"
    })
      .then(response => {
        console.log("success")
        console.log(response.data)
        if (response.data.err) {
          this.setState({
            error: response.data.err
          })
        } else {
          this.setState({
            boardId: response.data.boardId,
            contents: response.data.contents.words
          })
        }

        axios({
          method: "get",
          url:
            "https://www.lecturesharing.com:8080/groups/" +
            groupSelect +
            "/stt/" +
            this.state.boardId
        }).then(res => {
          console.log(JSON.stringify(res))
          this.props.setProgress()
          this.setState({
            progress: !this.state.progress
          })
          this.props.fetchBoardInfo(this.props.groupSelect)
        })
      })

      .catch(error => {
        console.log("error")
        console.log(error)
        this.a = 2
      })

    if (a === 1) {
      this.setState({
        file: ""
      })
    }
  }

  onChange = e => {
    this.setState({
      file: e.target.files[0]
    })
  }
  onClick = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onSelect = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const style = {
      border: "1px solid black",
      color: "white",
      margin: "9px",
      padding: "9px"
    }

    let content
    if (!this.state.progress) {
      content = (
        <Fragment>
          <form onSubmit={this.handleSubmit}>
            <div style={style}>
              <div>Input type</div>
              <input
                type="radio"
                name="inputType"
                defaultValue="audiofile"
                defaultChecked
                onClick={this.onClick}
              />{" "}
              Audio file
              <input
                type="radio"
                name="inputType"
                value="microphone"
                onClick={this.onClick}
              />{" "}
              Microphone
              <br />
              <div>Language</div>
              <select name="language" onChange={this.onSelect}>
                <option defaultValue="en-US"> English </option>
                <option value="ko-KR"> Korean </option>
              </select>
            </div>
            <div style={style}>
              <h2>{this.state.contents}</h2>
              <input type="file" name="uploadFile" onChange={this.onChange} />
              <button type="submit" onClick={this.toDb}>
                {" "}
                Submit{" "}
              </button>
              <div>
                Using mp3, mp4, m4a, mu-law, a-law or other lossy codecs during
                recording or transmission may reduce accuracy.{" "}
              </div>
            </div>
          </form>
        </Fragment>
      )
    } else {
      content = <img src={require("../../../Loading.gif")} />
    }
    return <div>{content}</div>
  }
}

export default Stt
