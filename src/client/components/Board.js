import { inject, observer } from "mobx-react"
import * as React from "react"
import axios from "axios"
import WritingBoard from "./board/WritingBoard"
import BoardList from "./board/BoardList"
import {
  BrowserRouter as Router,
  Link,
  NavLink,
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  withRouter
} from "react-router-dom"
import { action, computed, observable } from "mobx"

@inject("groupSelect", "userid")
@observer
class Board extends React.Component {
  state = {
    information: []
  }
  store = this.props.groupSelect

  constructor(props) {
    super(props)
    console.log("Boardconstructor")
    this.fetchBoardInfo(this.store.group.groupId)
  }
  componentWillReceiveProps() {
    var imsi = this.store.getGroupId()
    console.log(imsi)
    this.fetchBoardInfo(imsi)
  }

  componentWillMount() {
    console.log("BoardcomponentWillMount")
  }
  //Promise.all 메소드를 하용하여([자바스크립트] 비동기프로그래밍, ES6(ECMA Script 6) - Promise로 콜백지옥 해결하기 참고) getTitle과 getContent가 모두 실행 됩니다.
  //async/await를 사용하여 비동기 작업을 동기 작업인 것처럼 코딩을 가능하도록 합니다. async는 비동기 작업을 하도록 하고, await는 비동기 작업인 Promise를 기다립니다.
  //출처: http://beomy.tistory.com/36 [beomy]
  fetchBoardInfo = async id => {
    const info = await Promise.all([
      axios({
        method: "get",
        url: "https://www.lecturesharing.com:8080/groups/" + id + "/boards"
      })
        .then(response => {
          console.log(response)
          console.log(JSON.stringify(response))
          this.informationConcat(response)
        })
        .catch(error => {
          console.log(error)
        })
    ])
  }

  handleCreate = data => {
    this.fetchBoardInfo(this.store.group.groupId)
  }

  componentDidMount() {
    console.log("componentDidMount")
  }
  // componentWillUpdate(){
  //   const store = this.props.groupSelect;
  //   this.fetchBoardInfo(store.getGroupId());
  // }

  power = []
  informationConcat(response) {
    let abc = []
    let i = 0
    const info = response.data.boards
    console.log(info.length)
    for (i = 0; i < info.length; i++) {
      abc = abc.concat([info[i]])
    }
    this.setState({
      information: abc
    })
    this.power = abc
  }
  delete = (groupId, boardId) => {
    axios
      .delete("https://www.lecturesharing.com:8080/groups/" + groupId + "/boards/" + boardId)
      .then(response => {
        console.log(response)
        this.fetchBoardInfo(this.store.group.groupId)
      })
      .catch(error => {
        console.log(error)
      })
  }
  render() {
    console.log("Boardjs의 유저아이디" + this.props.userid)
    return (
      <div>
        <Router>
          <div>
            <li>
              <NavLink activeStyle={{ fontSize: 24 }} to="/writing_board">
                {" "}
                글작성{" "}
              </NavLink>
            </li>
            <Switch>
              <Route
                exact={true}
                path="/writing_board"
                render={() => (
                  <WritingBoard
                    groupSelect={this.store.group.groupId}
                    onCreate={this.handleCreate.bind(this)}
                  />
                )}
              />
            </Switch>
          </div>
        </Router>
        <BoardList
          data={this.state.information}
          delete={this.delete}
          userid={this.props.userid}
          groupSelect={this.store}
        />
      </div>
    )
  }
}

export default Board
