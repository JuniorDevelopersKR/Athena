import React, { Component } from "react"
import EditBoardInfo from "./EditBoardInfo"

class EditBoardList extends Component {
  static defaultProps = {
    data: []
  }

  render() {
    const { data, setPlaySec } = this.props
    console.log("리스트의 로그" + data)
    const list = data.map(info => (
      <EditBoardInfo
        info={info}
        setPlaySec={setPlaySec}
        changeContent={this.props.changeContent}
      />
    ))

    return <div>{list}</div>
  }
}

export default EditBoardList
