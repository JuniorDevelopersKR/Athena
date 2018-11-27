import React, { Fragment } from "react"
import "./SearchGroup.css"
class SearchGroupInfo extends React.Component {
  state = {
    groupMaster: "",
    id: "",
    name: ""
  }

  apply = () => {
    console.log("신청한 id는 " + this.props.info.id)
    this.props.apply(this.props.info.id)
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    const { name, id } = this.props.info
    const style = {
      border: "1px solid black",
      margin: "9px",
      padding: "9px"
    }
    return (
      <div style={style}>
        <Fragment>
          <h2>그룹이름 : {name}</h2>{" "}
          <button className="Float--Right" onClick={this.apply}>
            신청
          </button>
        </Fragment>
      </div>
    )
  }
}

export default SearchGroupInfo
