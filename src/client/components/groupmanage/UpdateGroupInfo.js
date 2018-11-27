import React, { Component, Fragment } from "react"
import { BrowserRouter as Router, NavLink, Redirect } from "react-router-dom"
import axios from "axios"

class UpdateGroupInfo extends Component {
  state = {
    infoData: ""
  }
  constructor() {
    super()
  }
  componentDidMount() {
    this.getGroupInfo()
  }
  getGroupInfo = async () => {
    console.log("getGroupInfo")
    const info = await Promise.all([
      axios({
        method: "get",
        url:
          "https://www.lecturesharing.com:8080/groups/" + this.props.groupSelect.group.groupId
      })
        .then(response => {
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
      infoData: information
    })
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state.infoData)
  }
  //수정한 groupinfo 저장
  updateInfo = () => {
    axios
      .put(
        "https://www.lecturesharing.com:8080/groups/" + this.props.groupSelect.group.groupId,
        { description: this.state.infoData }
      )
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }
  render() {
    return (
      <Fragment>
        <input
          type="textarea"
          name="infoData"
          value={this.state.infoData}
          onChange={this.onChange}
        />
        <button onClick={this.updateInfo}> 수정완료 </button>
      </Fragment>
    )
  }
}

export default UpdateGroupInfo
