import axios from "axios"
import React, { Component } from "react"

class WritingUboard extends Component {
  state = {
    contents: "",
    file: "",
    title: ""
  }
  //async함수로 동기화시켜준다
  handleSubmit = async e => {
    // 페이지 새로고침방지
    e.preventDefault()
    //a는 성공여부확인
    console.log("이전")
    const formData = new FormData()
    console.log("이후")
    formData.append("sampleFile", this.state.file)
    formData.append("contents", this.state.contents)
    formData.append("title", this.state.title)

    var a = 1

    await axios({
      data: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      },
      method: "POST",
      url: "http://www.lecturesharing.com:8080/user/boards"
    })
      .then(function success(response) {
        console.log("success")
        console.log(response.data)
      })
      .catch(function b(error) {
        console.log("error")
        console.log(error)
        this.a = 2
      })
    if (a === 1) {
      this.props.onCreate()
      this.setState({
        contents: "",
        file: "",
        title: ""
      })
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onChange = e => {
    this.setState({
      file: e.target.files[0]
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1> Athena </h1>
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            name="title"
            onChange={this.handleChange}
            value={this.state.title}
            placeholder="Title"
            type="text"
          />
          <br />
          <textarea
            className="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
            cols={50}
            name="contents"
            onChange={this.handleChange}
            value={this.state.contents}
            placeholder="Content"
            rows={8}
          />
          <br />
          <input type="file" name="uploadFile" onChange={this.onChange} />

          <button type="submit"> 글작성 </button>
        </form>
      </div>
    )
  }
}

export default WritingUboard
