import * as React from "react"
import { inject, observer } from "mobx-react"
import { BrowserRouter as Router, NavLink } from "react-router-dom"
import "./CateGory.css"

@inject("groupSelect", "userid")
class Category extends React.Component {
  compareCategory = clicked => {
    if (clicked === 1) {
      return (
        <div className="CateGory">
          <ul>
            <li>
              <NavLink exact={true} activeStyle={{ fontSize: 24 }} to="/main">
                {" "}
                User Info{" "}
              </NavLink>
            </li>
            <li>
              <NavLink exact={true} activeStyle={{ fontSize: 24 }} to="/uboard">
                {" "}
                Board{" "}
              </NavLink>
            </li>
          </ul>
        </div>
      )
    } else if (
      clicked !== 1 &&
      this.props.groupSelect.group.groupMaster === this.props.userid
    ) {
      return (
        <div className="CateGory">
          <ul>
            <li>
              <NavLink exact={true} activeStyle={{ fontSize: 24 }} to="/main2">
                {" "}
                Group Info{" "}
              </NavLink>
            </li>

            <li>
              <NavLink exact={true} activeStyle={{ fontSize: 24 }} to="/board">
                {" "}
                Board{" "}
              </NavLink>
            </li>
            <li>
              <NavLink exact={true} activeStyle={{ fontSize: 24 }} to="/chat">
                {" "}
                Chat{" "}
              </NavLink>
            </li>
            <li>
              <NavLink
                exact={true}
                activeStyle={{ fontSize: 24 }}
                to="/sttboard"
              >
                {" "}
                stt board{" "}
              </NavLink>
            </li>
            <li>
              <NavLink
                exact={true}
                activeStyle={{ fontSize: 24 }}
                to="/groupManage"
              >
                {" "}
                그룹관리페이지{" "}
              </NavLink>
            </li>
          </ul>
        </div>
      )
    } else {
      console.log(this.props.groupSelect.group.groupMaster + "지금 그룹마스터")

      return (
        <div>
          <ul>
            <li>
              <NavLink exact={true} activeStyle={{ fontSize: 24 }} to="/main2">
                {" "}
                Group Info{" "}
              </NavLink>
            </li>

            <li>
              <NavLink exact={true} activeStyle={{ fontSize: 24 }} to="/board">
                {" "}
                Board{" "}
              </NavLink>
            </li>
            <li>
              <NavLink exact={true} activeStyle={{ fontSize: 24 }} to="/chat">
                {" "}
                Chat{" "}
              </NavLink>
            </li>
            <li>
              <NavLink exact={true} activeStyle={{ fontSize: 24 }} to="/stt">
                {" "}
                stt로 가자{" "}
              </NavLink>
            </li>
            <li>
              <NavLink
                exact={true}
                activeStyle={{ fontSize: 24 }}
                to="/sttboard"
              >
                {" "}
                stt board{" "}
              </NavLink>
            </li>
          </ul>
        </div>
      )
    }
  }
  render() {
    let userCategory
    let clicked = this.props.setClick

    userCategory = this.compareCategory(clicked)

    return <div>{userCategory}</div>
  }
}

export default Category
