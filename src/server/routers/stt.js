// Imports the Google Cloud client library
const speech = require("@google-cloud/speech")
const securityConfig = require("../../../config")
const path = require("path")
const stt = require("../db/stt")()
const file = require("../db/file")()

// const fs = require("fs")
// const audiosprite = require("audiosprite")

const express = require("express")
const router = express.Router()

router.post("", function(req, res, next) {
  console.log("Start!")

  const languageCode = req.body.language
  const inputType = req.body.inputType
  const fileName = req.files.sampleFile

  console.log(fileName.name)
  console.log(languageCode)
  console.log(inputType)

  const client = new speech.SpeechClient({
    keyFilename: securityConfig.google_speech.keyFilename,
    projectId: securityConfig.google_speech.projectId
  })

  const fileType = path.extname(fileName.name)

  // const opts = {
  //   export: "ogg",
  //   output: fileName.name
  // }

  // if (fileType === ".m4a") {
  //   // fileName = _dirname
  //   // console.log(fileName)

  //   audiosprite(fileName, opts, function(err, obj) {
  //     if (err) {
  //       return console.error(err)
  //     }

  //     console.log(JSON.stringify(obj, null, 2))
  //   })
  // }

  const audio = {
    content: fileName.data.toString("base64")
  }

  let config = {
    enableWordTimeOffsets: true,
    encoding: "LINEAR16",
    languageCode: languageCode,
    sampleRateHertz: "16000"
  }

  if (fileType === ".ogg") {
    config.encoding = "OGG_OPUS"
  }

  if (fileType === ".flac") {
    config.encoding = "FLAC"
  }

  const request = {
    audio: audio,
    config: config
  }

  if (inputType === "audiofile") {
    console.log(inputType + " in function")

    client
      .longRunningRecognize(request)
      .then(data => {
        const operation = data[0]
        // Get a Promise representation of the final result of the job
        return operation.promise()
      })
      .then(data => {
        const response = data[0]

        let contents = {}
        let posts = []
        let splitSentence = ""
        let count = 0
        let startSecs = 0
        let dbContents = ""

        contents.posts = posts
        console.log(contents)

        response.results.forEach(result => {
          result.alternatives[0].words.forEach(wordInfo => {
            // NOTE: If you have a time offset exceeding 2^32 seconds, use the
            // wordInfo.{x}Time.seconds.high to calculate seconds.
            const endSecs =
              `${wordInfo.endTime.seconds}` +
              `.` +
              wordInfo.endTime.nanos / 100000000

            splitSentence = splitSentence + wordInfo.word + " "

            console.log(`Word: ${wordInfo.word}`)
            console.log(`\t ${startSecs} secs - ${endSecs} secs`)
            if (count % 10 === 0) {
              startSecs =
                "-->" +
                `${wordInfo.startTime.seconds}` +
                `.` +
                wordInfo.startTime.nanos / 100000000 +
                "-->"
              dbContents += startSecs
            }
            if (count % 10 === 9) {
              let post = {
                startSecond: startSecs,
                words: splitSentence
              }
              dbContents += " " + splitSentence
              splitSentence = ""
              contents.posts.push(post)
            }

            count++
          })

          console.log(dbContents)
        })

        // res.status(200).json({ contents })

        console.log(
          fileName.name + contents + req.session.user.id + req.groupId
        )
        fileName.mv(`${__dirname}/../../../public/${fileName.name}`, function(
          saveErr
        ) {
          if (saveErr) {
            next(saveErr)
          }
          file.upload(fileName.name, function(dbFileErr, fileResult) {
            if (dbFileErr) {
              next(dbFileErr)
            }
            console.log(fileResult.insertId + "ddwd")
            stt.write(
              fileName.name,
              dbContents,
              req.session.user.id,
              req.groupId,
              fileResult.insertId,
              function(err, results) {
                res
                  .status(200)
                  .json({ contents: contents, boardId: results.insertId })
              }
            )
          })
        })
      })
      .catch(err => {
        console.error("ERROR:", err)
        res.status(200).json({ error: err })
      })
  }
})

router.get("", function(req, res) {
  stt.findByGroupId(req.groupId, function(err, result) {
    res.status(200).json({ sttBoards: result })
  })
})

router.get("/:sttBoardId", function(req, res) {
  stt.show(req.params.sttBoardId, function(err, result) {
    let downloadFile = result[0].filename
    // res.attachment(downloadFile)
    // res.download(`${__dirname}/../upload/${downloadFile}`)
    res.status(200).json({
      filePath: `${downloadFile}`,
      sttBoard: result
    })
  })
})

router.put("/:sttBoardId", function(req, res) {
  stt.update(req.params.sttBoardId, req.body.contents, function(err, result) {
    res.status(200).json({ success: true })
  })
})
module.exports = router
