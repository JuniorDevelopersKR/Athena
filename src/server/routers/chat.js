const express = require('express')
const chat = require('../db/chat')()

const router = express.Router();

router.get('/:groupId', function(req, res){
  console.log(`show chat list`)
  chat.showChatInGroup(req.params.groupId, function(err, result){
    res.status(200).json({groupChats : result});
  })
})

module.exports = router;
