import axios from "axios"
import React, { Component } from "react"
import Modal from "react-responsive-modal"
import GroupApplyList from "./GroupApplyList"

class GroupApplyM extends Component {
  state = {
    id: "",
    information: [],
    open: false
  }
  constructor(props) {
    super(props)
    this.setState({
      id: this.props.groupSelect.group.groupId
    })
  }

  getApply = async e => {
    const info = await Promise.all([
      axios({
        method: "get",
        //그 그룹에 지원한 사람들을 출력해주는 url로 바꿔줘야됨
        url:
          "https://www.lecturesharing.com:8080/groups/" +
          this.props.groupSelect.group.groupId +
          "/apply"
      })
        .then(response => {
          console.log(response)
          this.informationConcat(response)
        })
        .catch(error => {
          console.log(error)
        })
    ])
  }
  informationConcat(response) {
    let abc = []
    let i = 0
    //받아오는 정보로 바꿔줘야함
    const info = response.data.users
    console.log(info.length)
    for (i = 0; i < info.length; i++) {
      abc = abc.concat([info[i]])
    }
    this.setState({
      information: abc
    })
  }

  accept = (userId, groupId, id) => {
    console.log("허락한 신청인의 id는" + userId)
    axios({
      method: "put",
      url:
        "https://www.lecturesharing.com:8080/groups/" +
        groupId +
        "/accept/" +
        id +
        "/users/" +
        userId
    })
      .then(response => {
        console.log(response)
        this.onCloseModal()
      })
      .catch(error => {
        console.log(error)
      })
  }

  onOpenModal = () => {
    this.setState({ open: true })
    this.getApply()
  }

  onCloseModal = () => {
    this.setState({ open: false })
  }

  render() {
    const { open } = this.state
    return (
      <div>
        <button onClick={this.onOpenModal}>그룹신청자 현황</button>
        <Modal open={open} onClose={this.onCloseModal} center>
          신청자 명단입니다.
          <br />
          <GroupApplyList data={this.state.information} accept={this.accept} />
        </Modal>
      </div>
    )
  }
}

export default GroupApplyM
