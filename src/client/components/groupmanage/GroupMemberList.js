import React, { Component } from "react"
import GroupMemberInfo from "./GroupMemberInfo"

class GroupMemberList extends Component {
  static defaultProps = {
    data: []
  }

  render() {
    const { data, expelUser } = this.props
    const list = data.map(info => (
      <GroupMemberInfo info={info} expelUser={expelUser} />
    ))
    return <div>{list}</div>
  }
}

export default GroupMemberList
