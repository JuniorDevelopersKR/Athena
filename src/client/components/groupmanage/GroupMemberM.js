import axios from "axios"
import React, { Component } from "react"
import Modal from "react-responsive-modal"
import GroupMemberList from "./GroupMemberList"

class GroupMemberM extends Component {
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

  getMember = async e => {
    const info = await Promise.all([
      axios({
        method: "get",
        //그 그룹에 속한 사람들을 출력해주는 url로 바꿔줘야됨
        url:
          "https://www.lecturesharing.com:8080/groups/" +
          this.props.groupSelect.group.groupId +
          "/users"
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
  expelUser = id => {
    //유저 추방 id
    axios({
      method: "delete",
      //그 추방할 user의 id로 url로 바꿔줘야됨
      url:
        "https://www.lecturesharing.com:8080/groups/" +
        this.props.groupSelect.group.groupId +
        "/users/" +
        id
    })
      .then(response => {
        console.log(response)
        //지운 후에 일단 리스트가 새로 불려오는지 확인해야함
        this.onCloseModal()
      })
      .catch(error => {
        console.log(error)
      })
  }

  onOpenModal = () => {
    this.setState({ open: true })
    this.getMember()
  }

  onCloseModal = () => {
    this.setState({ open: false })
  }

  render() {
    const { open } = this.state
    return (
      <div>
        <button onClick={this.onOpenModal}>그룹 맴버 명단</button>
        <Modal open={open} onClose={this.onCloseModal} center>
          <div>그룹 맴버</div>
          <br />
          <GroupMemberList
            data={this.state.information}
            expelUser={this.expelUser}
          />
        </Modal>
      </div>
    )
  }
}

export default GroupMemberM
