import * as React from "react"
import axios from "axios"
import ChatForm from "./chat/ChatForm"
import ChatList from "./chat/ChatList"
import { inject } from "mobx-react"
import io from "socket.io-client"
import "./Chat.css"
//여기서 받아서 넘겨줘
@inject("groupSelect", "username", "userid")
class Chat extends React.Component {
  state = {
    groupSelect: null,
    information: [],
    messageContent: null,
    userid: null,
    username: null
  }

  constructor(props) {
    super(props)
    this.setState({
      groupSelect: this.props.groupSelect.group.groupId,
      userid: this.props.userid,
      username: this.props.username
    })
    console.log(this.props.groupSelect.group.groupId + "채트의 그룹아이디")
    console.log(this.props.username + "채트 props 유저이름")
    this.socket = io("https://www.lecturesharing.com:8080", {
      query: { nickname: this.props.username },
      transports: ["websocket"]
    })

    console.log("create")
    this.socket.on("room", data => {
      console.log(`room message : ${data}`)
    })
    //그룹의 프라이머리키 = room의 프라이머리키
    this.socket.emit("joinRoom", {
      nickname: this.props.username,
      roomId: this.props.groupSelect.group.groupId
    })
  }

  setMessageContent = messageContent => {
    this.setState({
      messageContent: messageContent
    })
    console.log(messageContent)
  }

  getMessage = () => {
    return new Promise((resolve, reject) => {
      this.socket.on("room", data => {
        console.log(`room data ${data}`)
        let abc = this.state.information
        this.setState({
          information: abc.concat(data)
        })
      })
      resolve()
    })
  }
  getLastMessage = () => {
    //지난 메시지 받아와야됨
    axios({
      groupId: this.props.groupSelect.group.groupId,
      method: "get",
      url:
        "https://www.lecturesharing.com:8080/chat/" +
        this.props.groupSelect.group.groupId
    })
      .then(response => {
        console.log(response)
        this.informationConcat(response)
      })
      .catch(error => {
        console.log(error)
      })
  }
  informationConcat(response) {
    let abc = []
    let i = 0
    const info = response.data.groupChats
    console.log(info.length)
    for (i = 0; i < info.length; i++) {
      abc = abc.concat([info[i]])
    }
    this.setState({
      information: abc
    })
    this.power = abc
  }
  componentWillMount = () => {
    this.getLastMessage()
  }
  componentDidMount() {
    this.getMessage()
  }
  submit = e => {
    e.preventDefault()
    const messageContents = this.state.messageContent
    this.socket.emit("createRoom", {
      name: this.props.groupSelect.group.groupId,
      userId: this.props.userid
    })
    //룸아이디도 어디로 보낼지 primary key
    this.socket.emit("message", {
      groupId: this.props.groupSelect.group.groupId,
      message: messageContents,
      userId: this.props.userid,
      username: this.props.username
    })
    this.setState({ messageContent: null })
    console.log("지금 메시지콘텐트" + this.state.messageContent)
    console.log("submit")
  }

  render() {
    let username = this.props.username
    let userid = this.props.userid
    let groupSelect = this.props.groupSelect.group.groupId
    return (
      <div className="Chat">
        <h1>채팅창</h1>
        <ChatList info={this.state.information} userid={userid} />
        <ChatForm
          username={username}
          userid={userid}
          groupSelect={groupSelect}
          submit={this.submit}
          setMessageContent={this.setMessageContent}
        />
      </div>
    )
  }
}
export default Chat
