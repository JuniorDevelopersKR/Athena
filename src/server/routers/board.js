const express = require('express')
const router = express.Router();

const board = require('../controller/boardController')

router.post('', board.write)
router.get('', board.showBoardsOfGroup)
router.delete('/:boardId', board.remove)
router.post('/:boardId/fork', board.fork)
router.get('/:fileId/download', board.downloadFile)

module.exports = router;
