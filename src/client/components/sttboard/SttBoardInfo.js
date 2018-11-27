import axios from "axios"
import React, { Fragment } from "react"
import Modal from "react-responsive-modal"
import FileDownload from "js-file-download"
import { Redirect } from "react-router"
import { inject, observer, Provider } from "mobx-react"

@inject("sttBoardId")
class SttBoardInfo extends React.Component {
  state = {
    contents: "",
    fileId: "",
    filename: "",
    groupId: "",
    id: "",
    redirect: false,
    title: "",
    userId: ""
  }

  filedownload = (e, fileId, filename) => {
    e.preventDefault()
    console.log("파일이름" + this.state)
    axios({
      method: "get",
      responseType: "blob", //바이너리 타입으로 해야 된다
      url:
        "https://www.lecturesharing.com:8080/groups/" +
        this.props.groupId +
        "/stt/" +
        this.props.info.sttBoardId
      //1은 그룹아이디로 받아줘야해요
    })
      .then(response => {
        console.log(response)
        //리스폰스를 받아와서
        FileDownload(response.data, filename)
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleOnClick = () => {
    // some action...
    // then redirect

    this.props.sttBoardId.setSttBoardId(this.props.info.id)
    this.setState({ redirect: true })
  }

  render() {
    let sttboard
    const {
      title,
      contents,
      id,
      userId,
      groupId,
      filename,
      fileId
    } = this.props.info
    const style = {
      border: "1px solid black",
      margin: "9px",
      padding: "9px"
    }

    if (this.state.redirect) {
      return <Redirect push to="/editboard" />
    }

    return (
      <div style={style}>
        {
          <Fragment>
            <button onClick={this.handleOnClick}>{title}</button>
          </Fragment>
        }
      </div>
    )
  }
}

export default SttBoardInfo
