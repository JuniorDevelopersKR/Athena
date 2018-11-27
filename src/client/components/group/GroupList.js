import React, { Component } from "react"
import GroupInfo from "./GroupInfo"
import './GroupList.css'

class GroupList extends Component {
  static defaultProps = {
    data: []
  }

  render() {
    const { data, onClick, setClick } = this.props
    const list = data.map(info => (
      <GroupInfo info={info} onClick={onClick} setClick={setClick} />
    ))
    return <div className='Group--List'>{list}</div>
  }
}

export default GroupList
