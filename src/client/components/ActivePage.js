import { inject, observer, Provider } from "mobx-react"
import * as React from "react"

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
import Board from "./Board"
import Chat from "./Chat"
import Stt from "./sttboard/Stt"
import Info from "./Info"
import Uboard from "./userboard/Uboard"
import UserInfo from "./UserInfo"
import GroupManage from "./GroupManage"
import SttBoard from "./SttBoard"
import EditBoard from "./sttboard/EditBoard"
import SttBoardId from "../store/SttBoardId"
import "./CateGory.css"

const notFound = () => {
  return <h1>이것은 404</h1>
}

const admin = () => {
  const isAdmin = false
  return isAdmin ? <h3>Admin입니다</h3> : <Redirect to="/" />
}

const sttBoardId = new SttBoardId()

@inject("groupSelect", "username", "userid")
@observer
class ActivePage extends React.Component {
  render() {
    const store = this.props.groupSelect.group
    console.log(store.groupId + " sttBoardId : " + sttBoardId.getSttBoardId())

    return (
      <Provider sttBoardId={sttBoardId}>
        <div>
          <h1 id="font"> {store.groupName}</h1>
          <Switch>
            <Route exact={true} path="/main2" component={Info} />
            <Route
              exact={true}
              path="/Uboard"
              component={Uboard}
              username={this.props.username}
              userid={this.props.userid}
            />
            <Route exact={true} path="/board" component={Board} />
            <Route
              exact={true}
              path="/chat"
              component={Chat}
              groupSelect={this.props.groupSelect}
              username={this.props.username}
              userid={this.props.userid}
            />
            <Route
              exact={true}
              path="/sttboard"
              component={SttBoard}
              groupSelect={this.props.groupSelect}
            />
            <Route
              exact={true}
              path="/editboard"
              component={EditBoard}
              groupSelect={this.props.groupSelect}
            />
            <Route exact={true} path="/main" component={UserInfo} />
            <Route exact={true} path="/groupManage" component={GroupManage} />
            <Route path="/admin" component={admin} />
            <Route component={notFound} />
          </Switch>
        </div>
      </Provider>
    )
  }
}
export default withRouter(ActivePage)
