import { action, computed, observable } from "mobx"
import { Redirect } from "react-router-dom"

class SttBoardId {
  sttBoardId = ""

  setSttBoardId = id => {
    this.sttBoardId = id
  }

  getSttBoardId = () => {
    return this.sttBoardId
  }
}
export default SttBoardId
