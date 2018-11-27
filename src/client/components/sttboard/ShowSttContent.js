import React, { Component } from "react"
import "./ShowSttContent.css"
class ShowSttContent extends Component {
  static defaultProps = {
    data: []
  }

  render() {
    const { data } = this.props
    return <div className="center-block">{data}</div>
  }
}

export default ShowSttContent
