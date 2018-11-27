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
import Home from "./Homemenu/Home"
import Main from "./Main"
import Header from "./Homemenu/Header"
import Info from "./Homemenu/Info"
import About from "./Homemenu/About"
import Etc from "./Homemenu/Etc"
import { Provider } from "mobx-react"
import { throws } from "assert"
import Bottom from "./Homemenu/Bottom"

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />

            <Switch>
              <Route exact={true} path="/" component={Home} />
              <Route exact={true} path="/main" component={Main} />
            </Switch>

            <Bottom />
          </div>
        </Router>
      </div>
    )
  }
}

export default App
