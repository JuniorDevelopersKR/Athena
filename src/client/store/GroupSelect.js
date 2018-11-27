import { action, computed, observable } from "mobx"
import { Redirect } from "react-router-dom"

class GroupSelect {
  @observable
  group = { groupId: "0", groupName: "default", groupMaster: "" }

  @action
  setGroupId = (groupId, groupName, groupMaster) => {
    this.group.groupId = groupId
    this.group.groupName = groupName
    this.group.groupMaster = groupMaster
    console.log(groupId, groupName, groupMaster)
  }

  @action
  getGroupId = () => {
    return this.group.groupId
  }
}
export default GroupSelect
