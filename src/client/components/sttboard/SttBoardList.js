import React, { Component } from "react"
import SttBoardInfo from "./SttBoardInfo"

class SttBoardList extends Component {
  static defaultProps = {
    data: []
  }

  render() {
    const { data } = this.props
    const list = data.map(info => (
      <SttBoardInfo
        info={info}
        userid={this.props.userid}
        groupSelect={this.props.groupSelect}
        SttBoardId={this.props.SttBoardId}
      />
    ))
    return <div>{list}</div>
  }
}

export default SttBoardList
