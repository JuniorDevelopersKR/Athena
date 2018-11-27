import React, { Component } from "react"
import GroupApplyInfo from "./GroupApplyInfo"

class GroupApplyList extends Component {
  static defaultProps = {
    data: []
  }

  render() {
    const { data, accept } = this.props
    const list = data.map(info => (
      <GroupApplyInfo info={info} accept={accept} />
    ))
    return <div>{list}</div>
  }
}

export default GroupApplyList
