import { inject, observer } from "mobx-react"
import axios from "axios"
import React, { Component } from "react"

@inject("groupSelect")
@observer
class Info extends Component {
  state = {
    info: "기본 그룹에 대한 설명페이지 입니다."
  }
  componentWillMount() {
    this.getGroupInfo()
  }
  //그룹에 대한 설명을 적을 수 있는 데이터 베이스가 필요합니다
  getGroupInfo = async () => {
    console.log("getGroupInfo")
    const info = await Promise.all([
      axios({
        method: "get",
        url:
          "https://www.lecturesharing.com:8080/groups/" +
          this.props.groupSelect.group.groupId
      })
        .then(response => {
          console.log("강길환ㅄ" + response)
          console.log(JSON.stringify(response))
          this.setInfo(response)
        })
        .catch(error => {
          console.log(error)
        })
    ])
  }
  setInfo(response) {
    //이거 info로 받아옴 DB에서 가져올때 다시확인
    const information = response.data.group[0].description
    this.setState({
      info: information
    })
  }
  render() {
    const info = this.state.info
    return <div>{info}</div>
  }
}

export default Info
