import { inject, observer } from "mobx-react"
import * as React from "react"
import axios from "axios"
import "./EditBoard.css"

import {
  BrowserRouter as Router,
  Link,
  NavLink,
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  withRouter
} from "react-router-dom"
import EditBoardList from "./EditBoardList"
import ShowSttContent from "./ShowSttContent"

@inject("sttBoardId", "groupSelect")
@observer
class EditBoard extends React.Component {
  constructor() {
    super()
  }
  play = startSecond => {
    this.changeCurrentTime(startSecond)
    console.log(this.audio.currentTime)
    // if (this.state.play) {
    //   this.setState({ play: false })
    //   this.audio.pause()
    // } else {
    //   this.setState({ play: true })
    this.audio.play()
    // }
  }
  changeCurrentTime = time => {
    this.audio.currentTime = time
  }
  state = {
    contentObj: [],
    info: "",
    play: false,
    playSec: "",
    showInfo: ""
  }

  componentWillMount() {
    this.filedownload()
    this.showContent()
  }

  // componentDidMount() {
  //   this.showContent()
  // }
  filedownload = () => {
    // e.preventDefault()
    console.log("에딧그룹셀렉트" + this.props.groupSelect.getGroupId())

    axios({
      method: "get",
      url:
        "https://www.lecturesharing.com:8080/groups/" +
        this.props.groupSelect.getGroupId() +
        "/stt/" +
        this.props.sttBoardId.getSttBoardId()
    })
      .then(response => {
        console.log(response)
        console.log(JSON.stringify(response.data.sttBoard[0]))
        console.log(response.data.sttBoard[0].contents)
        this.setInfo(response)
        this.setFilePath(response)
      })
      .catch(error => {
        console.log(error)
      })
  }
  setInfo = response => {
    this.setState({
      info: response.data.sttBoard[0].contents
    })
    this.setArray()
  }
  setArray = () => {
    var info = this.state.info
    var data = info.split("-->")
    data = data.slice(1, data.length)
    this.setState({
      info: data
    })
    let audios = new Array()

    console.log("for문 위의 로그")
    for (var i = 1; i < data.length; i += 2) {
      let audioContent = {
        content: "",
        key: "",
        startSecond: ""
      }
      audioContent.startSecond = data[i - 1]
      audioContent.content = data[i]
      audioContent.key = i - 1
      audios.push(audioContent)
      console.log("배열 : " + JSON.stringify(audioContent))
    }
    this.setState({
      contentObj: audios
    })
  }
  setPlaySec = sec => {
    this.setState({
      playSec: sec
    })
    this.play(sec - 0.3)
  }
  saveContent = () => {
    console.log(JSON.stringify(this.state.contentObj) + "확인해봐야함")
    var i
    var info = this.state.info
    var fixInfo = ""
    for (i = 0; i < info.length; i++) {
      if (this.state.contentObj[i]) {
        var stSecond = this.state.contentObj[i].startSecond
        var content = this.state.contentObj[i].content
        fixInfo += "-->" + stSecond + "-->" + content
        console.log(fixInfo + "마지막 값")
      }
    }
    axios
      .put(
        "https://www.lecturesharing.com:8080/groups/" +
          this.props.groupSelect.getGroupId() +
          "/stt/" +
          this.props.sttBoardId.getSttBoardId(),
        { contents: fixInfo }
      )
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }
  showContent = () => {
    var i
    var info = this.state.info
    var fixInfo = ""
    for (i = 0; i < info.length; i++) {
      if (this.state.contentObj[i]) {
        fixInfo += this.state.contentObj[i].content
      }
    }
    this.setState({
      showInfo: fixInfo
    })
  }
  changeContent = (key, content) => {
    // console.log("키" + key + "내용", content)
    this.setState(prevState => ({
      contentObj: prevState.contentObj.map(obj =>
        obj.key === key ? Object.assign(obj, { content: content }) : obj
      )
    }))
    console.log("지금 content" + content)
    console.log(JSON.stringify(this.state.contentObj) + "바뀐배열값")
  }

  render() {
    console.log(this.state.playSec + "지금실행시간")
    console.log(JSON.stringify(this.state.contentObj) + "랜더 obj스트링파이")
    return (
      <div>
        <div>
          <audio
            controls
            src={"https://www.lecturesharing.com:8080/Google_Gnome.wav"}
            ref={audio => {
              this.audio = audio
            }}
          />
          {/* <button onClick={this.play}> click </button> */}
        </div>
        <EditBoardList
          changeContent={this.changeContent}
          data={this.state.contentObj}
          setPlaySec={this.setPlaySec}
        />
        <div>
          <button className="button1" onClick={this.saveContent}>
            {" "}
            Save{" "}
          </button>
          <button className="button1" onClick={this.showContent}>
            {" "}
            Show{" "}
          </button>
          <ShowSttContent data={this.state.showInfo} />
        </div>
      </div>
    )
  }
}

export default EditBoard
