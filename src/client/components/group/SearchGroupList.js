import React, { Component } from "react"
import SearchGroupInfo from "./SearchGroupInfo"
import axios from "axios"
import { BrowserRouter as Router, Redirect } from "react-router-dom"

class SearchGroupList extends Component {
  static defaultProps = {
    data: []
  }

  render() {
    const { data } = this.props
    console.log("SearchGroupInfo start")
    const list = data.map(info => (
      <SearchGroupInfo info={info} key={info.id} apply={this.props.apply} />
    ))
    return <div>{list}</div>
  }
}

export default SearchGroupList
