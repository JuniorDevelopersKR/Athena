import React, { Fragment } from "react"

class GroupMemberInfo extends React.Component {
  state = {
    id: "",
    name: ""
  }
  expelUser = () => {
    console.log("몇번눌렸니")
    this.props.expelUser(this.props.info.id)
  }
  render() {
    //db에서 이름이 뭘로 오는지 다시확인해야함
    const { username, id, groupId } = this.props.info
    const style = {
      border: "1px solid black",
      margin: "9px",
      padding: "9px"
    }
    return (
      <div style={style}>
        <Fragment>
          <div>{username}</div>
          <button onClick={this.expelUser}>추방시키기</button>
        </Fragment>
      </div>
    )
  }
}

export default GroupMemberInfo
