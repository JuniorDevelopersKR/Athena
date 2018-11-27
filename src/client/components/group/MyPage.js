import React, { Component, Fragment } from "react"
import {
  BrowserRouter as Router,
  NavLink,
  Redirect,
  withRouter
} from "react-router-dom"
import axios from "axios"
import { inject } from "mobx-react"
import "./MyPage.css"

class MyPage extends Component {
  state = {
    userid: null,
    username: null
  }
  componentWillMount() {
    this.getLoginSession()
  }
  componentWillReact() {
    this.getLoginSession()
  }
  // componentWillUpdate() {
  // this.getLoginSession()
  // }
  constructor() {
    super(),
      this.getLoginSession(),
      console.log("로그인된 유저이름" + this.state.username)
  }
  getLoginSession = async () => {
    console.log("getLoginSession")
    const loggedInfo = await Promise.all([
      //정리요망
      axios({
        method: "get",
        url: "https://www.lecturesharing.com:8080/user"
      })
        .then(response => {
          console.log(response)
          this.setState({
            userid: response.data.user.id,
            username: response.data.user.username
          })
          console.log("로그인된 유저이름" + this.state.username)
        })
        .catch(error => {
          console.log(error)
          console.log("세션못받아왔어")
          return <Redirect to="/" />
        })
    ])
  }

  onClick = () => {
    console.log("asdfasdfasdfasdf")
    this.props.setClick(1)
    this.nextPath("/main")
  }

  nextPath(path) {
    this.props.history.push(path)
  }
  render() {
    const name = this.state.username
    const style = {
      border: "1px solid black",
      margin: "9px",
      padding: "9px"
    }

    return (
      <div className="myname">
        <button onClick={this.onClick}>{name}</button>
      </div>
    )
  }
}

export default withRouter(MyPage)
