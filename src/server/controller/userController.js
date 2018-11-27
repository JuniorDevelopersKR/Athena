const userBoard = require("../db/user_board")()
const file = require("../db/file")()

module.exports.getSession = function(req, res) {
  res.status(200).json({ user: req.session.user })
}

module.exports.showAllUserBoards = function(req, res) {
  userBoard.findByUserId(req.session.user.id, function(err, result) {
    res.status(200).json({ boards: result })
  })
}

module.exports.logout = function(req, res) {
  req.session.destroy()
  res.status(200).json({ success: true })
}

module.exports.writeBoard = function(req, res, next) {
  console.log(`user id : ${req.session.user.id}`)

  if (!req.files) {
    console.log("NO File")
    userBoard.write(req.body, req.session.user.id, null, function(err, result) {
      userBoard.show(result.insertId, function(showErr, data) {
        res.status(201).json(data[0])
      })
    })
  } else {
    console.log(`File name : ${req.files.sampleFile.name}`)
    let sampleFile = req.files.sampleFile
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(`${__dirname}/../upload/${sampleFile.name}`, function(
      saveErr
    ) {
      if (saveErr) {
        next(saveErr)
      }
      file.upload(sampleFile.name, function(dbFileErr, fileResult) {
        if (dbFileErr) {
          next(dbFileErr)
        }
        userBoard.write(req.body, req.session.user.id, fileResult.insertId, function(err, result) {
            userBoard.show(result.insertId, function(showErr, data) {
              res.status(201).json({ board: data[0], file: fileResult })
            })
          }
        )
      })
    })
  }
}

module.exports.downloadFile = function(req, res) {
  file.download(req.params.boardId, function(err, fileResult) {
    let downloadFile = fileResult[0].filename
    res.attachment(downloadFile)
    res.download(`${__dirname}/../upload/${downloadFile}`)
  })
}
