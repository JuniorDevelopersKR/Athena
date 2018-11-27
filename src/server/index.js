const express = require("express")
const passport = require("passport")
const session = require("express-session")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const fs = require("fs")

// routers
const user = require("./routers/user")
const oauth = require("./routers/oauth")
const group = require("./routers/group")
const chat = require("./routers/chat")
const chatDb = require("./db/chat")()
const room = require("./db/room")()
const https = require("https")

const app = express()
// const server = require('http').createServer(app);
// const server = app.listen(8080);
// const io = require('socket.io').listen(server);

const options = {
  cert: fs.readFileSync("./security/cert.pem"),
  key: fs.readFileSync("./security/privkey.pem")
}
const server = https.createServer(options, app)
const io = require("socket.io")(server)

app.use(express.static(__dirname + "/../../public"))
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "athena01"
  })
)

app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json())
app.use(fileUpload())

app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://www.lecturesharing.com:3000"
  )
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,OPTIONS")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

//Todo: room을 만들면 서버 메모리에 Room, Room안의 user를 저장한 후 메세지는 DB에 저장 후 가져온다.
io.on("connection", socket => {
  console.log(
    `hello ${socket.id}, nickname : ${socket.handshake.query.nickname}`
  )
  const nickname = socket.handshake.query.nickname
  socket.on("createRoom", data => {
    console.log(`create Room : ${data.name}`)
    console.log(`userId : ${socket.request.user}`)
    room.create(data.userId, data.name, function(err, roomId) {
      socket.join(roomId)
      console.log(`create Room : ${roomId}`)
    })
  })

  socket.on("joinRoom", ({ roomId }) => {
    socket.join(roomId)
    console.log(`join Room`)
    console.log(`room id : ${roomId}`)
    socket.to(roomId).emit("room", `${nickname} 님이 입장하셨습니다.`)
    socket.emit("room", `${nickname} 님이 입장하셨습니다.`)
  })

  socket.on("inviteRoom", data => {
    console.log(`invite Room`)
    console.log(`room id : ${data.roomId}`)
  })

  socket.on("message", ({ username, userId, groupId, message }) => {
    console.log(`room id : ${groupId}, message : ${message}`)
    chatDb.saveChat(userId, username, groupId, message, function(err, result) {
      socket.to(groupId).emit("room", {
        message: message,
        time: new Date(),
        userId: userId,
        username: username
      })
      socket.emit("room", {
        message: message,
        time: new Date(),
        userId: userId,
        username: username
      })
    })
  })
})

// use router - 앞의 url로 시작하는 요청이 들어오면 뒤의 라우터 사용
app.use("/oauth", oauth)
// app.use(function(req, res, next) {
//   console.log(req.body.name)
//   console.log(`${req.session.user}`);
//   if (!req.session.user) {
//     let err = new Error("No login")
//     err.statusCode = 403
//     next(err)
//   }
//   next()
// })
app.use("/chat", chat)
app.use("/user", user)
app.use("/groups", group)

app.use(function(err, req, res, next) {
  console.log(`error occurrence : ${err}`)
  if (!err.statusCode) {
    err.statusCode = 500
  }
  res.status(err.statusCode).json({
    errorMassage: err,
    success: false
  })
})

server.listen(8080, () => console.log("Listening on port 8080!"))
