import React, { Fragment } from "react"
import "./GroupInfo.css"
import { withRouter } from "react-router-dom"

// import { BrowserRouter as Router, NavLink, Switch } from "react-router-dom"

class GroupInfo extends React.Component {
  onClick = () => {
    const { info, onClick } = this.props
    onClick(info.id, info.name, info.groupMaster)
    console.log("그룹인포 그룹마스터 " + info.groupMaster)
    this.setClick()
    this.nextPath("/main2")
  }
  nextPath(path) {
    this.props.history.push(path)
  }

  setClick = () => {
    this.props.setClick(0)
  }

  render() {
    const { name } = this.props.info

    return (
      <div className="Group--Info">
        <button onClick={this.onClick}>{name}</button>
      </div>
    )
  }
}

export default withRouter(GroupInfo)
