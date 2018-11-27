import { inject, observer } from "mobx-react"
import axios from "axios"
import React, { Component } from "react"

class UserInfo extends Component {
  state = {
    info: "유저의 개인 정보입니다."
  }
  //유저의 인포가 들어있슙니당당당승구리당당
  /*{
  setInfo(response) {
    //이거 info로 받아옴 DB에서 가져올때 다시확인
    const information = response.data.info
    this.setState({
      info: information
    })
  }*/
  render() {
    const info = this.state.info
    return <div>{info}</div>
  }
}

export default UserInfo
