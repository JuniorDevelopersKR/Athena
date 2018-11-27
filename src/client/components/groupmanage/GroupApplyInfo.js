import React, { Fragment } from "react"

class GroupApplyInfo extends React.Component {
  state = {
    id: "",
    name: ""
  }
  accept = () => {
    this.props.accept(
      this.props.info.userId,
      this.props.info.groupId,
      this.props.info.id
    )
  }
  render() {
    const { username, userId } = this.props.info
    const style = {
      border: "1px solid black",
      margin: "9px",
      padding: "9px"
    }
    return (
      <div style={style}>
        <Fragment>
          <div>{userId}</div>
          <div>{username}</div>
          <button onClick={this.accept}>신청 받기</button>
        </Fragment>
      </div>
    )
  }
}

export default GroupApplyInfo
