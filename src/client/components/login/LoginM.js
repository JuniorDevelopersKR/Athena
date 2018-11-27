import axios from "axios"
import Facebook from "./Facebook"
import React, { Component } from "react"
import Modal from "react-responsive-modal"
import "../../App.css"
import "./LoginM.css"
class LoginM extends Component {
  // input = React.createRef();

  state = {
    category: "",
    open: false
  }
  onOpenModal = () => {
    this.setState({ open: true })
  }

  onCloseModal = () => {
    this.setState({ open: false })
  }

  // async함수로 동기화만들고 await 이 함수를 동기화시킴
  handleSubmit = async e => {
    // 페이지 새로고침방지
    e.preventDefault()
    //a는 성공여부를 나타냄
    let a = 1
    await axios
      .post("https://www.lecturesharing.com:8080/groups", {
        category: this.state.category
      })
      .then(function success(response) {
        console.log("success")
        console.log(response.data)
      })
      .catch(function(error) {
        console.log("error")
        console.log(error)
        a = 2
      })
    this.setState({
      category: ""
    })
    this.onCloseModal()
    if (a === 1) {
      this.props.onCreate()
    }
  }

  render() {
    const { open } = this.state
    return (
      <div className="Login">
        <button className="LoginButton" onClick={this.onOpenModal}>
          로그인
        </button>
        <Modal open={open} onClose={this.onCloseModal} center>
          <br />
          <Facebook onClose={this.onCloseModal} />
        </Modal>
      </div>
    )
  }
}

export default LoginM
