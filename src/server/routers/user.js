const router = require("express").Router()
const user = require("../controller/userController")

router.get("", user.getSession)
router.get("/boards", user.showAllUserBoards)
router.post("/logout", user.logout)
router.post("/boards", user.writeBoard)
router.get("/boards/:boardId/download", user.downloadFile)

module.exports = router
