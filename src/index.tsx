import * as React from "react"
import * as ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import App from "./client/App"
import registerServiceWorker from "./client/registerServiceWorker"

import "./client/index.css"

ReactDOM.render(
  
    <App />,
  
  document.getElementById("root") as HTMLElement
)

registerServiceWorker()
