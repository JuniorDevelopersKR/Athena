import React, { Component } from "react"
import UboardInfo from "./UboardInfo"

class UboardList extends Component {
  static defaultProps = {
    data: []
  }

  render() {
    const { data } = this.props
    const list = data.map(info => <UboardInfo info={info} />)
    return <div>{list}</div>
  }
}

export default UboardList
