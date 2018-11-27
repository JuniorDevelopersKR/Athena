import axios from "axios"
import * as React from "react"
import FacebookLogin from "react-facebook-login"
import { Redirect } from "react-router-dom"

class Facebook extends React.Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }
  }
  gotoMain = () => {
    if (this.state.loggedIn) {
      //모달 끄기
      // this.props.onClose()
      // console.log("메인이동" + this.state.loggedIn)

      return <Redirect to="/main" />
    }
  }

  responseFacebook = response => {
    axios.defaults.withCredentials = true
    //얘가 회원 정보
    console.log(response)
    var test = this
    axios
      .post("https://www.lecturesharing.com:8080/oauth/facebook", {
        id: response.userID,
        provider: "facebook",
        username: response.name
      })
      .then(response2 => {
        console.log("success")
        console.log(response2.data.user.username)

        if (response2.data.user) {
          console.log("Get User: There is a user saved in the server session: ")
          this.setState({
            loggedIn: true,
            username: response2.data.user.username
          })
          console.log("셋스테이션성공")
          console.log(this.state.username)
          // console.log(username);
          // this.gotoMain()
        } else {
          console.log("Get user: no user")
          this.setState({
            loggedIn: false,
            username: null
          })
        }
        // console.log(user)
      })
      .catch(function(error) {
        console.log("error")
        console.log(error)
      })
    console.log(this.state.username)
  }

  getUserInfo(user) {
    if (true) {
      this.setState({
        // email: user.email1,
        loggedIn: true,
        // name: name1,
        // picture: picture1,
        // userID: userID1,
        username: user.username
      })
      console.log("EMAIL" + this.state.email)
    } else {
      console.log("Get user: no user")
      this.setState({
        loggedIn: false,
        username: null
      })
    }
  }

  componentClicked = () => {
    console.log("clicked")
    // this.responseFacebook();
  }
  // componentDidUpdate() {
  //   if (this.state.loggedIn) {
  //     this.gotoMain()
  //   }
  // }

  render() {
    let fbContent
    let loggedIn = this.state.loggedIn

    if (!this.state.loggedIn) {
      fbContent = (
        <FacebookLogin
          appId="1879705068793535"
          autoLoad={false}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
        />
      )
    }

    return (
      <div>
        {loggedIn ? this.gotoMain() : ""}
        {fbContent}
      </div>
    )
  }
}

export default Facebook
