import { inject, observer } from "mobx-react"
import * as React from "react"
import GroupApplyM from "./groupmanage/GroupApplyM"
import GroupMemberM from "./groupmanage/GroupMemberM"
import UpdateGroupInfo from "./groupmanage/UpdateGroupInfo"
@inject("groupSelect")
@observer
class GroupManage extends React.Component {
  render() {
    return (
      <div>
        그룹 관리자 페이지
        <GroupApplyM groupSelect={this.props.groupSelect} />
        <GroupMemberM groupSelect={this.props.groupSelect} />
        <UpdateGroupInfo groupSelect={this.props.groupSelect} />
      </div>
    )
  }
}

export default GroupManage
