import axios from "axios"
import React, { Fragment } from "react"
import Modal from "react-responsive-modal"
import FileDownload from "js-file-download"
import { inject } from "mobx-react"

import "./BoardInfo.css"

@inject("groupSelect")
class BoardInfo extends React.Component {
  state = {
    contents: "",
    fileId: "",
    filename: "",
    id: "",
    open: false,
    title: ""
  }
  onOpenModal = () => {
    this.setState({ open: true })
  }

  onCloseModal = () => {
    this.setState({ open: false })
  }
  filedownload = (e, fileId, filename) => {
    e.preventDefault()
    console.log("파일이름" + this.state)
    axios({
      method: "get",
      responseType: "blob", //바이너리 타입으로 해야 된다
      url:
        "https://www.lecturesharing.com:8080/groups/" +
        this.props.groupSelect.group.groupId +
        "/boards/" +
        fileId +
        "/download"
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

  fork = () => {
    console.log(JSON.stringify(this.props.info))
    axios
      .post(
        `https://www.lecturesharing.com:8080/groups/${
          this.props.groupSelect.group.groupId
        }/boards/${this.props.info.id}/fork`,
        {}
      )
      .then(response => {
        console.log(response.data)
        alert("포크가 완료되었습니다")
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const {
      title,
      contents,
      id,
      filename,
      fileId,
      username,
      createdTime
    } = this.props.info
    console.log(JSON.stringify(this.props.info) + "글쓴이")
    const style = {
      border: "1px solid black",
      margin: "9px",
      padding: "9px"
    }

    const { open } = this.state
    let board
    let fI = fileId
    let fn = filename
    if (fn === null) {
      console.log(filename)

      board = (
        <div>
          <h1>글제목 : {title}</h1>
          <br />
          <div className="Modal--Content">글내용 : {contents}</div>
        </div>
      )
    } else {
      board = (
        <div>
          <h1>글제목 : {title}</h1>
          <br />
          <div className="Modal--Content">
            글내용 : {contents}
            <br />
            <div className="Modal--FileName">
              파일 이름{" "}
              <a href="#" onClick={e => this.filedownload(e, fileId, filename)}>
                {" "}
                {filename}
              </a>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div>
        <div className="Board--List">
          {/* <Fragment> */}
          <button id="inline" onClick={this.onOpenModal}>
            {title}
          </button>

          <span id="FloatRight">
            <p>
              <button onClick={this.fork}>fork</button>
              {createdTime} {username}
            </p>
          </span>
          {/* <div className="ModalCss"> */}
          <Modal
            // styles="ModalCss"
            // class="ModalCss"
            open={open}
            onClose={this.onCloseModal}
            center
          >
            <div className="Modal--Div">{board}</div>
          </Modal>
          {/* </div> */}
          {/* </Fragment> */}
        </div>
      </div>
    )
  }
}

export default BoardInfo
