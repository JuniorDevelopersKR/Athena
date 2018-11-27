import axios from "axios"
import React, { Fragment } from "react"
import Modal from "react-responsive-modal"

class UboardInfo extends React.Component {
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
  filedownload = (e, fileId) => {
    e.preventDefault()
    console.log("파일아이디" + fileId)
    axios({
      method: "get",
      url: "http://www.lecturesharing.com:8080/user/boards/" + fileId + "/download"
    })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { title, contents, id, filename, fileId } = this.props.info
    const style = {
      border: "1px solid black",
      margin: "9px",
      padding: "9px"
    }
    const { open } = this.state
    let uboard
    let fn = fileId
    if (fn === null) {
      console.log(filename)

      uboard = (
        <div>
          글제목 : {title}
          <br />
          글내용 : {contents}
        </div>
      )
    } else {
      uboard = (
        <div>
          글제목 : {title}
          <br />
          글내용 : {contents}
          <br />
          파일 이름{" "}
          <a href="#" onClick={e => this.filedownload(e, fileId)}>
            {" "}
            {filename}
          </a>
        </div>
      )
    }

    return (
      <div style={style}>
        {
          <Fragment>
            <button onClick={this.onOpenModal}>{title}</button>
            <Modal open={open} onClose={this.onCloseModal} center>
              {uboard}
            </Modal>
          </Fragment>
        }
      </div>
    )
  }
}

export default UboardInfo
