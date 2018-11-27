import axios from "axios"
import React, { Component } from "react"
import Modal from "react-responsive-modal"
import SearchGroupList from "./SearchGroupList"

class SearchGroupM extends Component {
  state = {
    information: [],
    keyword: "",
    name: "",
    open: false
  }
  onOpenModal = () => {
    this.setState({ open: true })
    this.getGroupList()
  }

  onCloseModal = () => {
    this.setState({ open: false })
  }

  handleChange = e => {
    this.setState({
      keyword: e.target.value
    })
  }
  //여기서 데이터를 받아와야 한다 axios로
  getGroupList = async () => {
    console.log("fetchGroupInfo")
    const info = await Promise.all([
      axios({
        method: "get",
        url: "https://www.lecturesharing.com:8080/groups/all"
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
  apply = id => {
    axios({
      method: "post",
      //지원하는 url
      url: "https://www.lecturesharing.com:8080/groups/" + id + "/apply"
    })
      .then(response => {
        console.log(response)
        this.onCloseModal()
      })
      .catch(error => {
        console.log(error)
      })
  }
  render() {
    const { open } = this.state
    return (
      <div className="Group--Button">
        <button onClick={this.onOpenModal}>
          <img
            className="image"
            src={require("../../../images/search-icon.png")}
          />
        </button>
        <Modal open={open} onClose={this.onCloseModal} center>
          <div className="Modal--Div" />
          그룹 검색
          <br />
          <input
            className="Modal--Input"
            value={this.state.keyword}
            onChange={this.handleChange}
            placeholder="검색"
          />
          <SearchGroupList
            apply={this.apply}
            data={this.state.information.filter(
              info => info.name.indexOf(this.state.keyword) > -1
            )}
          />
        </Modal>
      </div>
    )
  }
}

export default SearchGroupM
