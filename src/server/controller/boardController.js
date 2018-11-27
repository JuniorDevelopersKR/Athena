const board = require("../db/board")()
const userBoard = require("../db/user_board")()
const file = require("../db/file")()

module.exports.write = function(req, res, next) {
  console.log(`Write Board user id : ${req.session.user.id}, group id : ${req.groupId}`)

  if (!req.files) {
    console.log("NO File")
    board.write(req.body, req.groupId, req.session.user.id, null, function(err, result) {
      board.show(result.insertId, function(showErr, data) {
        res.status(201).json(data[0])
      })
    })
  } else {
    console.log(`File name : ${req.files.sampleFile.name}`)
    let sampleFile = req.files.sampleFile
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(`${__dirname}/../upload/${sampleFile.name}`, function(saveErr) {
      if (saveErr) {
        next(saveErr)
      }
      file.upload(sampleFile.name, function(dbFileErr, fileResult) {
        if (dbFileErr) {
          next(dbFileErr)
        }
        board.write(req.body, req.groupId, req.session.user.id, fileResult.insertId, function(err, result) {
            board.show(result.insertId, function(showErr, data) {
              res.status(201).json({ board: data[0], file: fileResult })
            })
          }
        )
      })
    })
  }
}

module.exports.showBoardsOfGroup =  function(req, res) {
  console.log(`Group : ${req.groupId} - Get boards`)
  board.findByGroupId(req.groupId, function(err, data) {
    res.status(200).json({ boards: data })
  })
}

module.exports.remove = function(req, res) {
  console.log(`Board : ${req.params.boardId} - remove boards`)
  board.remove(req.params.boardId, function(err, data) {
    res.status(200).json({ success: true })
  })
}

module.exports.fork = function(req, res) {
  console.log(`Board : ${req.params.boardId} - fork to my board`)

  board.show(req.params.boardId, function(err, data) {
    let writingBoard = { contents: data[0].contents, title: data[0].title }
    let fileId = null

    if (data[0].fileId) {
      fileId = data[0].fileId
    }
    userBoard.write(writingBoard, req.session.user.id, fileId, function(error, result) {
      res.status(200).json({ success: result })
    })
  })
}

module.exports.downloadFile = function(req, res) {
  console.log(`File download Id - ${req.params.fileId}`)
  file.download(req.params.fileId, function(err, fileResult) {
    console.log(fileResult[0].id)
    let downloadFile = fileResult[0].filename
    res.attachment(downloadFile)
    res.download(`${__dirname}/../upload/${downloadFile}`)
  })
}
