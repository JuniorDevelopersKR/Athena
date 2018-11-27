import axios from "axios"
import { Provider } from "mobx-react"
import * as React from "react"
import { BrowserRouter as Router, Redirect } from "react-router-dom"
import ActivePage from "./components/ActivePage"
import Category from "./components/Category"
import Group from "./components/Group"
import GroupSelect from "./store/GroupSelect"

import "./App.css"

const groupSelect = new GroupSelect()

class Main extends React.Component {
  state = {
    clicked: 1,
    userid: null,
    username: null
  }

  setClick = clicked => {
    this.setState({
      clicked: clicked
    })
    console.log("클릭 실험" + this.state.clicked)
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

  render() {
    return (
      <Provider
        groupSelect={groupSelect}
        username={this.state.username}
        userid={this.state.userid}
      >
        <Router>
          <div className="App">
            <div className="Main-root1">
              <Group setClick={this.setClick} />
            </div>
            <div className="Main-root2">
              <Category setClick={this.state.clicked} />
            </div>
            <div className="Main-root3">
              <ActivePage />
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default Main
