import { inject, observer, Provider } from "mobx-react"
import axios from "axios"
import React, { Component } from "react"
import MakeGroupM from "./group/MakeGroupM"
import GroupList from "./group/GroupList"
import { Redirect } from "react-router-dom"
import SearchGroupM from "./group/SearchGroupM"
import MyPage from "./group/MyPage"
import "../App.css"
import './Group.css'

@inject("groupSelect")
@observer
class Group extends Component {
  state = {
    check: false,
    information: []
  }

  fetchGroupInfo = async () => {
    console.log("fetchGroupInfo")
    const info = await Promise.all([
      axios({
        method: "get",
        url: "https://www.lecturesharing.com:8080/groups"
      })
        .then(response => {
          console.log(response)
          this.informationConcat(response)
        })
        .catch(error => {
          console.log(error)
        })
    ])
  }

  handleCreate = () => {
    console.log("handle")
    this.fetchGroupInfo()
  }
  // handlePageChange() {
  // window.location = "/main"
  // }
  informationConcat(response) {
    let abc = []
    let i = 0
    const info = response.data.groups
    console.log(info.length)
    for (i = 0; i < info.length; i++) {
      abc = abc.concat([info[i]])
    }
    this.setState({
      information: abc
    })
  }
  componentWillReact() {
    console.log("componentWillReact")
  }

  constructor(props) {
    super(props)

    console.log("constructor")
  }

  componentWillMount() {
    this.fetchGroupInfo()
  }
  onClick = (id, name, groupMaster) => {
    const store = this.props.groupSelect
    console.log("groupMaster in Group.js" + groupMaster)
    store.setGroupId(id, name, groupMaster)
  }

  render() {
    const store = this.props.groupSelect.groupId
    console.log("MakeGroupRender")
    const setClick = this.props.setClick
    return (
      <div className='GroupList'>
        <MyPage setClick={setClick} />
        <MakeGroupM onCreate={this.handleCreate} />
        <SearchGroupM />
        <GroupList
          onClick={this.onClick}
          setClick={setClick}
          data={this.state.information}
        />
      </div>
    )
  }
}

export default Group
