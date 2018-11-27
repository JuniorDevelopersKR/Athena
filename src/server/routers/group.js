const express = require("express")
const router = express.Router()

const boardRouter = require("./board")
const sttRouter = require("./stt")

const group = require("../controller/groupController")
const groupManage = require("../controller/groupManageController")

router.get("", group.showGroupOfUser)
router.post("", group.make)
router.get("/all", group.showAll)
router.get("/:groupId/users", group.findUsers)

router.put("/:groupId", groupManage.editDescription)
router.delete('/:groupId/users/:userId', groupManage.expelUser)
router.post('/:groupId/apply', groupManage.applyGroup)
router.get("/:groupId/apply", groupManage.showUsersApplied)
router.put("/:groupId/accept/:id/users/:userId", groupManage.acceptUser)

router.use("/:groupId/stt",
  function(req, res, next) {
    req.groupId = req.params.groupId
    next()
  },
  sttRouter
)

router.use("/:groupId/boards",
  function(req, res, next) {
    req.groupId = req.params.groupId
    next()
  },
  boardRouter
)

module.exports = router
